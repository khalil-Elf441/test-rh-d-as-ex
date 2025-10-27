# Exam Prerequisites

This directory contains Ansible playbooks to initialize the environment for the EX316 Mock Exam.

## Automated Setup

The Ansible playbook will perform the following actions:
- Create the necessary namespaces: `db-app-ns`, `web-app-ns`, `multi-net-ns`, `migrated-vm-ns`.
- Verify that the `rhel9` VM template exists in the `openshift` namespace.

### Usage

1.  Make sure you have Ansible installed and are logged into your OpenShift cluster.
2.  Modify the `ansible/inventory/hosts` file to point to your cluster.
3.  Run the following command from the root of this `prerequisites` directory:

    ```bash
    ansible-playbook -i ansible/inventory/hosts ansible/playbook.yml
    ```

## Manual Setup

Before running the exam, you must ensure the following operators are installed and available on your cluster:
- **OpenShift Virtualization**
- **OpenShift ADP (for OADP)**
- **Migration Toolkit for Virtualization**

These can be installed from the OperatorHub in the OpenShift console.