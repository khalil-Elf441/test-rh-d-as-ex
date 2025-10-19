
import React from 'react';
import { Link } from 'react-router-dom';

// You can add a real logo here if you have one.
// import logo from '../assets/rh-logo.svg';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header-title">
        Red Hat Docs-as-Exam
      </Link>
      {/* <img src={logo} alt="Red Hat Logo" className="header-logo" /> */}
    </header>
  );
};

export default Header;
