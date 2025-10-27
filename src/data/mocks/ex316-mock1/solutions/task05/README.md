# Task 5: Configure networking between web and database servers

## Sections

### NetworkPolicy Configuration

**Notice:**
- Allow the web server to connect to the database.
- To test the policy, you can use the following container image: 'registry.redhat.io/rhel8/support-tools'

**Subtasks:**
- Create a NetworkPolicy in the 'db-app-ns' namespace.
- The policy must apply to the 'db-server' VM.
- The policy must allow ingress traffic on port 3306.
- The ingress traffic must only be from pods within the 'web-app-ns' namespace.