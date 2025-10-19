
import React from 'react';
import { Link } from 'react-router-dom';

const ExamplePage = () => {
  return (
    <div className="card">
      <Link to="/" className="back-link">
        &larr; Back to Home
      </Link>

      <div className="task-detail-header">
        <h1 className="task-detail-title">Example: Configure an internal YUM/DNF repository</h1>
      </div>

      <section className="task-section">
        <h2 className="section-title">Repository Configuration</h2>
        <p className="section-notice">
          The operating system vendor has provided a local repository source at <code>http://repo.example.com/BaseOS</code>.
          Configure your system to use this as its only source for packages.
        </p>
        <ul className="subtask-list">
          <li className="subtask-item">Disable all existing repository configurations.</li>
          <li className="subtask-item">Create a new repository configuration file named <code>/etc/yum.repos.d/internal.repo</code>.</li>
          <li className="subtask-item">Define a new repository with the ID <code>internal_baseos</code>.</li>
          <li className="subtask-item">Set the repository URL to <code>http://repo.example.com/BaseOS</code>.</li>
          <li className="subtask-item">Ensure the repository is enabled (<code>enabled=1</code>) and does not check GPG keys (<code>gpgcheck=0</code>).</li>
        </ul>
      </section>

      <section className="task-section">
        <h2 className="section-title">Verification</h2>
        <p className="section-notice">
          After configuration, verify that your system can access the new repository.
        </p>
        <ul className="subtask-list">
          <li className="subtask-item">Clean the package cache: <code>dnf clean all</code>.</li>
          <li className="subtask-item">List available repositories and ensure only <code>internal_baseos</code> is shown: <code>dnf repolist</code>.</li>
          <li className="subtask-item">Attempt to install a package (e.g., <code>dnf install -y vim</code>) to confirm the repository is working.</li>
        </ul>
      </section>
    </div>
  );
};

export default ExamplePage;
