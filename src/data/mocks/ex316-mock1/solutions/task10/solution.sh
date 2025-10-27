# 1. Create Snapshot
oc create -f - -n db-app-ns <<EOF
apiVersion: snapshot.kubevirt.io/v1alpha1
kind: VirtualMachineSnapshot
metadata:
  name: db-server-snap1
spec:
  source:
    apiGroup: kubevirt.io
    kind: VirtualMachine
    name: db-server
EOF

# 2. Restore from Snapshot
oc create -f - -n db-app-ns <<EOF
apiVersion: snapshot.kubevirt.io/v1alpha1
kind: VirtualMachineRestore
metadata:
  name: db-server-restore1
spec:
  target:
    apiGroup: kubevirt.io
    kind: VirtualMachine
    name: db-server
  virtualMachineSnapshotName: db-server-snap1
EOF