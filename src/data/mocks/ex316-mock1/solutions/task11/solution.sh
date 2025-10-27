# 1. Create Namespace
oc create namespace multi-net-ns

# 2. Create NAD
oc create -f - -n multi-net-ns <<EOF
apiVersion: "k8s.cni.cncf.io/v1"
kind: NetworkAttachmentDefinition
metadata:
  name: internal-net
spec:
  config: |
    {"cniVersion": "0.3.1", "name": "internal-net", "type": "cnv-bridge", "bridge": "br0", "vlan": 100}
EOF

# 3. Create VM with multiple interfaces
oc create -f - -n multi-net-ns <<EOF
apiVersion: kubevirt.io/v1
kind: VirtualMachine
metadata:
  name: router-vm
spec:
  template:
    spec:
      domain: {}
      networks:
      - name: default
        pod: {}
      - name: internal-net
        multus:
          networkName: internal-net
      domain:
        devices:
          interfaces:
          - name: default
            masquerade: {}
          - name: internal-net
            bridge: {}
EOF
