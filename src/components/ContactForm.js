import React, { useState } from 'react';
import Modal from 'react-modal';
import './ContactForm.css';
import ContactForm from './ContactForm'; // Assurez-vous d'importer votre ContactForm

Modal.setAppElement('#root');

function Services() {
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);

    const openContactForm = () => setIsContactFormOpen(true);
    const closeContactForm = () => setIsContactFormOpen(false);

    return (
        <div className="services-section">
            <h2>We offer creative working environments with a unique entrepreneurial spirit.</h2>
            <div className="services-container">
                {/* Ajoutez d'autres services ici */}

                {/* Carte de service pour contacter */}
                <div className="service-card">
                    <h3>Contact Us</h3>
                    <p>Have questions? Reach out to us directly through the form below.</p>
                    <button onClick={openContactForm}>Contact Us</button>
                </div>
            </div>

            {/* Modal pour ContactForm */}
            <Modal
                isOpen={isContactFormOpen}
                onRequestClose={closeContactForm}
                contentLabel="Contact Form"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <button onClick={closeContactForm} className="close-modal">X</button>
                <ContactForm />
            </Modal>
        </div>
    );
}

export default Services;
