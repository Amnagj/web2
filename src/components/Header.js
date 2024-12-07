import React from 'react';
import './Header.css';

function Header({ openLoginModal }) {
  const scrollToContact = (e) => {
    e.preventDefault(); // Prevent default link behavior
    const contactSection = document.getElementById('contact-section'); // Match the id of the Contact section
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the contact section
    }
  };
  return (
    <header className="header">
      <div className="logo">
        <h1>Co-Working Space</h1>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/courses">Courses</a></li>
          <li>
            <a href="#contact-section" onClick={scrollToContact}>Contact</a>
          </li>
          <li><button onClick={openLoginModal}>Login</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
