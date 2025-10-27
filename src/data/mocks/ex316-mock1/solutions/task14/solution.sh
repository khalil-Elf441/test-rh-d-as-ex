# 1. Create VM with custom MAC and cloud-init for static IP
oc create -f - -n web-app-ns <<EOF
apiVersion: kubevirt.io/v1
kind: VirtualMachine
metadata:
  name: legacy-app-vm
spec:
  template:
    spec:
      domain:
        devices:
          interfaces:
          - name: default
            macAddress: '02:00:00:00:00:01'
            masquerade: {}
      networks:
      - name: default
        pod: {}
      volumes:
      - name: cloudinitdisk
        cloudInitNoCloud:
          networkData: |
            version: 2
            ethernets:
              eth0:
                dhcp4: no
                addresses: [10.1.2.100/24]
                gateway4: 10.1.2.1
                nameservers:
                  addresses: [8.8.8.8]
EOF

# 2. Create NetworkPolicy
oc create -f - -n web-app-ns <<EOF
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-legacy-monitoring
spec:
  podSelector:
    matchLabels:
      kubevirt.io/domain: legacy-app-vm
  policyTypes:
  - Ingress
  ingress:
  - from:
    - ipBlock:
        cidr: 10.1.2.200/32
EOF

# 3. Start the VM
oc virt start legacy-app-vm -n web-app-ns

# 4. Verification
# oc get vmi legacy-app-vm -n web-app-ns -o yaml | grep -A 2 macAddress
# oc console legacy-app-vm -n web-app-ns
# ip a
# ping -c 1 10.1.2.200 # This should fail if the monitoring system is not up
