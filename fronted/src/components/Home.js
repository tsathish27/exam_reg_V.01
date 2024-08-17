
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import CheckEligibility from './CheckEligibility'; // Adjust the path as needed
import '../styles/home.css';

Modal.setAppElement('#root'); // Ensure this is set for accessibility

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='home'>
      <h2>Welcome to the Exam Registration Portal</h2>
      <div className='items1'>
        <ul>
          <button className='btn1' onClick={openModal}>Check Eligibility</button>
          <Link to="/DownloadHallTicket">
            <button className='btn1'>Download Hall Ticket</button>
          </Link>
          <Link to="/hod-login">
            <button className='btn1'>HOD Login</button>
          </Link>
          <Link to="/admin">
            <button className='btn1'>Admin Login</button>
          </Link>
        </ul>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Check Eligibility"
        className="modal"
        overlayClassName="overlay"
      >
        <button className="close-icon" onClick={closeModal}>Close</button>
        <CheckEligibility />
      </Modal>
    </div>
  );
}

export default Home;
