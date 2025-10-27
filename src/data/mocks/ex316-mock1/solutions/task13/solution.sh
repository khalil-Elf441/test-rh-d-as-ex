# 1. Create Service
oc expose vm web-server-staging --name=staging-svc --port=80 --target-port=80 -n web-app-ns

# 2. Create Route
oc create route edge --service=staging-svc --port=80 -n web-app-ns

# 3. Verify
oc get route web-server-staging -n web-app-ns
