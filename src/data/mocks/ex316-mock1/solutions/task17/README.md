# Task 17: Create a Cirros VM from a qcow2 URL

## Sections

### Create Cirros VM from qcow2 URL

**Notice:** Create a new Cirros VM in the default namespace from a qcow2 URL.

**Subtasks:**
- Create a DataVolume named 'cirros-dv' that imports the Cirros cloud image from 'https://download.cirros-cloud.net/0.5.2/cirros-0.5.2-x86_64-disk.img'.
- Create a VM named 'vm-from-cirros-qcow2' that uses the DataVolume.
- Ensure the VM is running with 1Gi of memory.
- Verify that you can access the VM's console.