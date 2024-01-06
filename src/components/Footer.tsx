import React from 'react';

const MyFooter = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <a href="https://github.com/perstarkse" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i> GitHub
        </a>
        <span className="separator"></span>
        <a href="mailto:perstark.se@gmail.com">
          <i className="fas fa-envelope"></i> Email
        </a>
        <span className="separator"></span>
        <a href="https://www.linkedin.com/in/per-stark/" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"></i> LinkedIn
        </a>
      </div>
      <div className="legal">
        <p>
          Per Stark | Built with wagmi.sh and next.js 🚀
        </p>
      </div>
    </footer>
  );
};

export default MyFooter;