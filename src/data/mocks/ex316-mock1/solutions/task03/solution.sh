# 1. Create Service
oc expose vm db-server --name=db-svc --port=3306 --target-port=3306 -n db-app-ns

# 2. Create User (assumes user does not exist)
# In a real cluster, you would use an existing identity provider.
# For this simulation, we create a placeholder user.
oc create user db-auditor

# 3. Create Role
oc create role vm-viewer-role --verb=get,list --resource=virtualmachines -n db-app-ns

# 4. Bind Role
oc create rolebinding db-auditor-binding --role=vm-viewer-role --user=db-auditor -n db-app-ns