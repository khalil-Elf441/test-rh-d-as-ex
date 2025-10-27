# Task 14: Integrate a Legacy Licensed Application VM

## Sections

### Legacy Application Integration

**Notice:** A legacy application server requires a specific MAC address for its license to be valid. It also needs a static IP address to be reachable from a monitoring system. You need to deploy this VM and ensure it is correctly configured and secured.

**Subtasks:**
- Create a new VM named 'legacy-app-vm' in the 'web-app-ns' namespace.
- Assign the specific MAC address '02:00:00:00:00:01' to the VM's default network interface.
- Configure the VM to have a static IP address of '10.1.2.100' on its default interface using cloud-init.
- Create a NetworkPolicy named 'allow-legacy-monitoring' that only allows ingress traffic from the monitoring system's IP address '10.1.2.200' to the 'legacy-app-vm'.
- Verify that the VM has the correct MAC address and IP address.
- Verify that the NetworkPolicy is correctly applied by attempting to connect from a different IP address and observing the failure.