
import React from 'react';
import './Footer.css';


function Footer() {
  return (
    
    <footer className="footer">
      <div className="footer-content">
      <div className="footer-section about">
           <h4>About us</h4>
            <ul>
                <li>7/7j</li>
                <li>Best Space</li>
                <li>Best Team</li>
                <li>Best Services</li>
            </ul>
            </div>
        <div className="footer-section detail">
          <h4>More Details</h4>
          
          <ul className="contact">
            <li><i className="fas fa-map-marker-alt"></i> 123 Rue des Co-Workers</li>
            <li><i className="fas fa-phone"></i> 123-456-7890</li>
            <li><i className="fas fa-envelope"></i>contact@coworking.com</li>
            </ul>
        </div>
        <div className="footer-section links">
          <h4>Follow us</h4>
          <ul>
            <li><a href="http://www.facebook.com"><i className="fab fa-facebook-f"></i> facebook</a></li>
            <li><a href="http://www.twitter.com"><i className="fab fa-twitter"></i> twitter</a></li>
            <li><a href="http://www.instagram.com"><i className="fab fa-instagram"></i> instagram</a></li>
            <li><a href="http://www.tiktok.com"><i className="fab fa-tiktok"></i> tiktok</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
