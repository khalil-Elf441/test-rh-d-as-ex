# 1. Create Backup
oc create -f - -n openshift-adp <<EOF
apiVersion: velero.io/v1
kind: Backup
metadata:
  name: web-server-backup
spec:
  includedNamespaces:
  - web-app-ns
  snapshotVolumes: true
  ttl: 720h0m0s
EOF

# 2. Verify
oc get backup web-server-backup -n openshift-adp -o jsonpath='{.status.phase}'