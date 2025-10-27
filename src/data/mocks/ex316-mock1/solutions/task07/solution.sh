# 1. Initiate Migration
oc virt migrate db-server -n db-app-ns

# 2. Monitor
oc get vmim -n db-app-ns -w