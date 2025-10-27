# Task 11: Configure a multi-homed VM

## Sections

### Multus Networking

**Notice:**
- Create a new VM that is connected to two different networks. Perform actions in a new 'multi-net-ns' namespace.
- The vlan ID is an example, you can use any valid vlan ID

**Subtasks:**
- Create a new namespace named 'multi-net-ns'.
- Create a NetworkAttachmentDefinition named 'internal-net' for a linux-bridge network.
- Deploy a new VM named 'router-vm'.
- Attach the VM to both the default pod network and the 'internal-net'.