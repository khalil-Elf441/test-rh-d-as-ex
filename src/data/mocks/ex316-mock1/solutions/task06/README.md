# Task 6: Backup the web server using OADP

## Sections

### OADP Backup

**Notice:** Perform a backup of the 'web-server' VM. Perform actions in the 'web-app-ns' namespace.

**Subtasks:**
- To ensure OADP is correctly configured for backups, first create an ObjectBucketClaim in the openshift-adp namespace and verify its availability.
- Ensure the OADP operator is functional and configured.
- Create a 'Backup' resource that targets the 'web-server' VM.
- Exclude the VM's memory state from the backup.
- Verify the backup operation completes successfully.