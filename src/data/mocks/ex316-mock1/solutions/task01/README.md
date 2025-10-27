# Task 1: Deploy a database server with a custom repository

## Sections

### Namespace and VM Provisioning

**Notice:** Perform all actions for this task in a new namespace named 'db-app-ns'. To install packages inside the VM, you must first configure a custom repository. Create a file at '/etc/yum.repos.d/custom.repo' with the following content: [custom-db]... (full content provided in prompt)

**Subtasks:**
- Create a new namespace named 'db-app-ns'.
- Provision a new VM named 'db-server' from a RHEL9 template.
- Inside the guest OS, install the 'mariadb-server' package using the provided repository details.
- Enable and start the 'mariadb' service.