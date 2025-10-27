# 1. Set CPU and Memory, and enable CPU Pinning
oc patch vm db-server -n db-app-ns --type=json -p='[{"op": "replace", "path": "/spec/template/spec/domain/cpu/cores", "value": 2}, {"op": "replace", "path": "/spec/template/spec/domain/resources/requests/memory", "value": "4Gi"}, {"op": "add", "path": "/spec/template/spec/domain/cpu/dedicatedCpuPlacement", "value": true}]'

# 2. Verify the changes
oc get vm db-server -n db-app-ns -o jsonpath="{.spec.template.spec.domain.cpu}"
oc get vm db-server -n db-app-ns -o jsonpath="{.spec.template.spec.domain.resources.requests.memory}"

# 3. Create a PVC for the new disk
oc create -f - -n db-app-ns <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-disk-pvc
spec:
  accessModes: [ReadWriteOnce]
  resources:
    requests:
      storage: 10Gi
EOF

# 4. Add a new 10Gi SATA disk
# Note: This requires the VM to be stopped to add a disk.
oc virt stop db-server -n db-app-ns
oc wait --for=condition=Ready=false vm/db-server -n db-app-ns --timeout=120s
oc patch vm db-server -n db-app-ns --type=json -p='[{"op": "add", "path": "/spec/template/spec/domain/devices/disks/-", "value": {"name": "data-disk", "disk": {"bus": "sata"}}}, {"op": "add", "path": "/spec/template/spec/volumes/-", "value": {"name": "data-disk", "persistentVolumeClaim": {"claimName": "data-disk-pvc"}}}]'
oc virt start db-server -n db-app-ns

# 5. Format and mount the disk inside the VM
# oc rsh db-server -n db-app-ns
# mkfs.xfs /dev/sdb
# mkdir /data
# mount /dev/sdb /data
# echo '/dev/sdb /data xfs defaults 0 0' >> /etc/fstab
