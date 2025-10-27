# Task 15: Migrate a VM from a foreign hypervisor

## Sections

### VM Migration with MTV

**Notice:** Migrate a VM named 'vm-to-migrate' from a simulated external hypervisor into a new namespace 'migrated-vm-ns'.

**Subtasks:**
- Create a new namespace named 'migrated-vm-ns'.
- Install the 'Migration Toolkit for Virtualization' Operator.
- Configure a 'Provider' resource to connect to the mock external hypervisor.
- Create a 'Plan' to migrate the 'vm-to-migrate' VM, mapping source networks and datastores.
- Execute the migration and verify the new VM is running in the 'migrated-vm-ns' namespace.