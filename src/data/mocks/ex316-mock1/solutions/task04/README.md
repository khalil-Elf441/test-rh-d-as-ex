# Task 4: Deploy a web server from a custom template

## Sections

### Template and VM Deployment

**Notice:** First, create a custom template. Then, deploy a web server from it in a new 'web-app-ns' namespace.

**Subtasks:**
- Create a new namespace named 'web-app-ns'.
- Create a new VM template named 'httpd-template' that uses a RHEL9 image.
- Configure the template to use cloud-init to install the 'httpd' package and enable the service.
- Deploy a new VM named 'web-server' in 'web-app-ns' from the 'httpd-template'.