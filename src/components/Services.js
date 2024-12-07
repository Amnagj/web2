import React, { useState } from 'react';
import Modal from 'react-modal';
import './Services.css';
import img1 from './img/réserve1.jpg';
import img2 from './img/service4.jpg';
import img3 from './img/réserve3.jpg';
import img4 from './img/service3.jpg';
import MeetingRoomForm from './MeetingRoomForm';

Modal.setAppElement('#root');
function Services() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false)

    return (
        <div className="services-section">
            <h2>We offer creative working environments with a unique entrepreneurial spirit.</h2>
            <div className="services-container">
                <div className="service-card">
                    <img src={img1} alt="Icone du service 1" />
                    <h3>Office Space</h3>
                    <p>Make this your home base with a private office. Fully-serviced and flexible, with all essentials included.</p>
                    <ul>
                        <li>Flexible contracts</li>
                        <li>Access your office 24/7/365</li>
                        <li>All inclusive - includes WiFi and services</li>
                    </ul>
                    <button onClick={openForm}>Find an open space</button>
                </div>
                <div className="service-card">
                    <img src={img2} alt="Icone du service 2" />
                    <h3>Coworking Membership</h3>
                    <p>Explore our diverse range of inspiring coworking locations, all with a flexible membership.</p>
                    <ul>
                        <li>Choose your plan: 5/10 days per month, or unlimited</li>
                        <li>Access during business hours</li>
                        <li>Join our thriving community</li>
                    </ul>
                    <button onClick={openForm}>Enquire now</button>
                </div>
                <div className="service-card">
                    <img src={img3} alt="Icone du service 3" />
                    <h3>Dedicated Desk</h3>
                    <p>Settle in at your own private desk in a beautifully designed shared workspace.</p>
                    <ul>
                        <li>Includes a personal locker</li>
                        <li>Access 24/7/365</li>
                        <li>Claim Your Dedicated Workspace</li>
                    </ul>
                    <button onClick={openForm}>Find a desk</button>
                    
                </div>
                <div className="service-card">
                    <img src={img4} alt="Icone du service 3" />
                    <h3>Meeting rooms</h3>
                    <p>Book meeting rooms on-demand, with the support and services you need at your fingertips.</p>
                    <ul>
                        <li>Choose from a variety of room sizes and types</li>
                        <li>AV and presentation equipment</li>
                        <li>Catering available</li>
                    </ul>
                    <button onClick={openForm}>Find a room</button>
                </div>
                {/* Ajoute d'autres services ici */}
            </div>
            {/* Meeting Room Modal */}
            <Modal
                isOpen={isFormOpen}
                onRequestClose={closeForm}
                contentLabel="Book a Meeting Room"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <button onClick={closeForm} className="close-modal">X</button>
                <MeetingRoomForm />
            </Modal>
        </div>
    );
}

export default Services;
