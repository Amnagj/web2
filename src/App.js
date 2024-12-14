import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage.js';
import Footer from './components/Footer';
import Services from './components/Services';
import LoginPage from './components/LoginPage';
import Courses from './components/Courses';
import ContactForm from './components/ContactForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import AvailableRoomsPage from './components/AvailableRoomsPage';
import AdminPanel from './components/AdminPanel';
import dashboard from './components/dashboard.js';


import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <Header openLoginModal={openLoginModal} />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/ContactForm" element={<ContactForm />} />
          <Route path="/available-rooms" element={<AvailableRoomsPage />} />
          <Route path="/AdminPanel" element={<AdminPanel />} />
          <Route path="/dashboard" element={<dashboard />} />

        </Routes>
        <Footer />
        <Modal
          isOpen={isLoginOpen}
          onRequestClose={closeLoginModal}
          contentLabel="Login"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <button onClick={closeLoginModal} className="close-modal">X</button>
          <LoginPage />
        </Modal>
      </div>
    </Router>
  );
}

export default App;
