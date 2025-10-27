# Task 9: Configure a health probe for the web server

## Sections

### Readiness Probe

**Notice:** Ensure 'web-server' only receives traffic when httpd is responsive. Perform actions in the 'web-app-ns' namespace.

**Subtasks:**
- Edit the 'web-server' VirtualMachine resource.
- Add a readiness probe.
- The probe should perform an HTTP GET request on port 80.
- Configure the probe with a failure threshold of 3.