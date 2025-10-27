# Task 3: Expose the database and configure RBAC

## Sections

### Service and User Management

**Notice:** Make the database accessible and create a read-only user. Perform actions in the 'db-app-ns' namespace.

**Subtasks:**
- Create a ClusterIP service named 'db-svc' exposing port 3306 for the 'db-server' VM.
- Create a new user named 'db-auditor'.
- Create a Role named 'vm-viewer-role' that only allows 'get' and 'list' access to VirtualMachine resources.
- Bind this Role to the 'db-auditor' user in the 'db-app-ns' namespace.