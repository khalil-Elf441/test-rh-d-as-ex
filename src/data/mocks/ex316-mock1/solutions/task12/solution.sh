# 1. Select a node
NODE_TO_DRAIN=$(oc get nodes -l node-role.kubernetes.io/worker= -o jsonpath='{.items[0].metadata.name}')

# 2. Taint the node
oc adm taint node $NODE_TO_DRAIN key=maintenance:NoSchedule

# 3. Drain the node
oc adm drain $NODE_TO_DRAIN --ignore-daemonsets --delete-local-data

# 4. Verify
oc get pods --all-namespaces -o wide | grep $NODE_TO_DRAIN # Should be empty except for daemonsets
