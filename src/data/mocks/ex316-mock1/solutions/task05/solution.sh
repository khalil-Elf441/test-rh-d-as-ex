# 1. Create NetworkPolicy
oc create -f - -n db-app-ns <<EOF
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-web-to-db
spec:
  podSelector:
    matchLabels:
      kubevirt.io/domain: db-server
  policyTypes:
  - Ingress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          kubernetes.io/metadata.name: web-app-ns
    ports:
    - protocol: TCP
      port: 3306
EOF