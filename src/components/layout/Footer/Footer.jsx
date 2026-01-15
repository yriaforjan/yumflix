import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaDatabase } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-socials">
          <a
            href="https://github.com/yriaforjan/yumflix.git"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </a>
          <a
            href="www.linkedin.com/in/yria-forjan-oliveira"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.themealdb.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TheMealDB API Source"
          >
            <FaDatabase />
          </a>
        </div>

        <div className="footer-grid">
          <ul className="footer-links">
            <li className="footer-link-item">
              <Link to="#" className="footer-link">
                Contact Us
              </Link>
            </li>
            <li className="footer-link-item">
              <a
                href="https://www.themealdb.com/api.php"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Data Source (API)
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Yumflix - Powered by TheMealDB | All
          rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
