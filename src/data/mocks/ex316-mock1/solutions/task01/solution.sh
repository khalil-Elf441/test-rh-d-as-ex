# 1. Create Namespace
oc create namespace db-app-ns

# 2. Create VM from a template (assumes a rhel9 template exists)
oc process -n openshift rhel9 --param NAME=db-server | oc create -n db-app-ns -f -

# 3. Wait for VM to be running
oc wait --for=condition=Ready vmi/db-server -n db-app-ns --timeout=300s

# 4. Install and configure services inside the VM
# You would use 'oc console' or 'virtctl ssh' to access the VM
# sudo -i
# echo -e "[custom-db]\nname=Custom DB Repo\nbaseurl=http://repo.example.com/db_packages\nenabled=1\ngpgcheck=0" > /etc/yum.repos.d/custom.repo
# dnf install -y mariadb-server
# systemctl enable --now mariadb
