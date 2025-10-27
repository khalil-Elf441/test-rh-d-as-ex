# 1. Create Block PVC
oc create -f - -n db-app-ns <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: db-data-disk
spec:
  accessModes: [ReadWriteOnce]
  volumeMode: Block
  resources:
    requests:
      storage: 20Gi
EOF

# 2. Add volume to VM
# Note: This requires the VM to be stopped to add a disk.
oc virt stop db-server -n db-app-ns
oc wait --for=condition=Ready=false vm/db-server -n db-app-ns --timeout=120s

oc patch vm db-server -n db-app-ns --type=json -p '[{"op": "add", "path": "/spec/template/spec/domain/devices/disks/-", "value": {"name": "dbdata", "disk": {"bus": "virtio"}}}, {"op": "add", "path": "/spec/template/spec/volumes/-", "value": {"name": "dbdata", "persistentVolumeClaim": {"claimName": "db-data-disk"}}}]'

oc virt start db-server -n db-app-ns

# 3. Verify inside guest
# oc console db-server -n db-app-ns
# lsblk (should show a new disk like vdb)
