# 1. Create Namespace
oc create namespace migrated-vm-ns

# 2. Install Operator
# This is done via OperatorHub in the UI. Find 'Migration Toolkit for Virtualization' and install.

# 3. Create Provider Secret and CR
oc create secret generic provider-secret --from-literal=user=provider-user --from-literal=password=provider-pass --from-literal=url=https://provider.example.com/sdk -n migrated-vm-ns

oc create -f - -n migrated-vm-ns <<EOF
apiVersion: forklift.konveyor.io/v1beta1
kind: Provider
metadata:
  name: external-provider
spec:
  type: vsphere
  url: https://provider.example.com/sdk
  secret:
    name: provider-secret
    namespace: migrated-vm-ns
EOF

# 4. Create Plan and execute
oc create -f - -n migrated-vm-ns <<EOF
apiVersion: forklift.konveyor.io/v1beta1
kind: Plan
metadata:
  name: vm-migration-plan
spec:
  provider:
    source:
      name: external-provider
    destination:
      name: host
  map:
    network:
      - source:
          name: "VM Network"
        destination:
          name: pod
    storage:
      - source:
          name: "datastore1"
        destination:
          storageClass: <default-storage-class>
  vms:
  - name: vm-to-migrate
EOF

oc create -f - -n migrated-vm-ns <<EOF
apiVersion: forklift.konveyor.io/v1beta1
kind: Migration
metadata:
  name: vm-migration
spec:
  plan:
    name: vm-migration-plan
EOF
