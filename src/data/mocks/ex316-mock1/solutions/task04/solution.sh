# 1. Create Namespace
oc create namespace web-app-ns

# 2. Create Template
oc create -f - <<EOF
apiVersion: template.openshift.io/v1
kind: Template
metadata:
  name: httpd-template
  namespace: web-app-ns
objects:
- apiVersion: kubevirt.io/v1
  kind: VirtualMachine
  metadata:
    name: "${NAME}"
  spec:
    template:
      spec:
        domain: {}
        volumes:
        - name: cloudinitdisk
          cloudInitNoCloud:
            userData: |
              #cloud-config
              packages:
                - httpd
              runcmd:
                - [ systemctl, enable, --now, httpd ]
EOF

# 3. Deploy from Template
oc new-app --template=httpd-template --param=NAME=web-server -n web-app-ns
