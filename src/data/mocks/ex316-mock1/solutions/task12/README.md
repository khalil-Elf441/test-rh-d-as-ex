# Task 12: Prepare a node for maintenance

## Sections

### Node Drain

**Notice:** A worker node needs to be updated. Safely drain it of all VMs.

**Subtasks:**
- Select a worker node running at least one VM.
- Taint the node to prevent new pods from being scheduled.
- Use 'oc adm drain' to gracefully evict all VMs from the node.
- Verify the VMs are migrated and the node is marked as unschedulable.