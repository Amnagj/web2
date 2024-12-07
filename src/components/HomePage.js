import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './HomePage.css';
import image1 from './img/co1.jpg';
import image2 from './img/co0.jpg';
import image3 from './img/co2.jpg';
import aboutImage from './img/about2.jpg';

function HomePage() {
    return (
        <div className="homepage">
            
            {/* Carousel Section */}
            <Carousel>
                <Carousel.Item>
                    <img src={image1} alt="Slide 1" className="d-block w-100" />
                    <Carousel.Caption>
                    <div className="welcome-box">
                        <h3>Your Professional Journey Starts Here: Welcome to Our Co-working Space</h3>
                        <p>Your ideal workspace for meetings, studies, and e-learning access.</p>
                    </div>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img src={image2} alt="Slide 2" className="d-block w-100" />
                    <Carousel.Caption>
                    <div className="welcome-box">
                        <h3>Your Professional Journey Starts Here: Welcome to Our Co-working Space</h3>
                        <p>Your ideal workspace for meetings, studies, and e-learning access.</p>
                    </div>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img src={image3} alt="Slide 3" className="d-block w-100" />
                    <Carousel.Caption>
                    <div className="welcome-box">
                        <h3>Your Professional Journey Starts Here: Welcome to Our Co-working Space</h3>
                        <p>Your ideal workspace for meetings, studies, and e-learning access.</p>
                    </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* About Us Section */}
            <div className="about-us-section">
                <div className="about-us-content">
                    <img src={aboutImage} alt="About Us" className="about-image" />
                    <div className="about-text">
                        <h3>About Us</h3>
                        <p>
                            Welcome to Your HomeBase Co-Work, where innovation meets collaboration. 
                            Our thoughtfully designed spaces are tailored to empower professionals, entrepreneurs, 
                            and teams to thrive in a dynamic environment. With state-of-the-art facilities, flexible 
                            membership plans, and a vibrant community, we provide the perfect blend of comfort and productivity. 
                            Whether you’re here to brainstorm your next big idea, meet with clients, or simply focus on your goals, 
                            HomeBase Co-Work is more than just a workspace – it’s a space where success happens.
                        </p>
                        <p>Learn more about our services <a href="about.html">here</a>.</p>
                    </div>
                </div>
            </div>
            {/* Contact Section */}
            <div className="contact-section">
                {/* Map Section */}
                <div className="map-container" id="contact-section">
                    <h3>Our Location</h3>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094286!2d144.95373531557656!3d-37.81720997975167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727a0a941e7a0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2s!4v1675265926291!5m2!1sen!2s"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Coworking Space Location"
                    ></iframe>
                </div>

                {/* Contact Details */}
                <div className="contact-content" >
                    <div className="contact-details">
                        <h3>Contact Us</h3>
                        <p>
                            Our team is available to assist you with any inquiries, recruitment opportunities, or quotation requests.
                        </p>
                        <p><strong>Get in touch:</strong></p>
                        <p>Email: contact@coworking.com</p>
                        <p>Phone: +1 (123) 456-7890</p>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form">
                        <h3>Send Us Your Inquiry</h3>
                        <form>
                            <input type="text" placeholder="First Name" required />
                            <input type="text" placeholder="Last Name" required />
                            <input type="email" placeholder="Email" required />
                            <textarea placeholder="Your Message" required></textarea>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default HomePage;
