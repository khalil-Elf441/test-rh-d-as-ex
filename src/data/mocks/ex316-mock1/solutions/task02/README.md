# Task 2: Configure dedicated storage for the database

## Sections

### Disk and Volume Management

**Notice:** Attach a new block volume for database data. Perform actions in the 'db-app-ns' namespace.

**Subtasks:**
- Create a 20Gi PVC named 'db-data-disk' with a 'volumeMode' of 'Block'.
- Attach the PVC to the 'db-server' VM as a data volume.
- Verify inside the guest OS that a new raw block device is available.
- Do not create a filesystem on the block device.