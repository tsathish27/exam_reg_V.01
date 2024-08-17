import React, { useState } from 'react';
import axios from 'axios';
import '../styles/DownloadHallTicket.css';

const DownloadHallTicket = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [message, setMessage] = useState('');

  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/generate-hall-ticket/${rollNumber}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Hall_Ticket_${rollNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading hall ticket:', error);
      setMessage('Wait for a few minutes. Hall tickets are being generated. Try downloading in a minute.');
    }
  };

  const handleFetchDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/students/${rollNumber}`);
      setStudentDetails(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
      setMessage('Failed to fetch student details. Please check the roll number and try again.');
    }
  };

  return (
    <div className="download-container">
      <h2>Download Hall Ticket</h2>
      <input 
        type="text" 
        value={rollNumber} 
        onChange={(e) => setRollNumber(e.target.value)} 
        placeholder="Enter your roll number" 
      />
      <button onClick={handleFetchDetails}>Fetch Details</button>
      <button onClick={handleDownload}>Download Hall Ticket</button>
      {message && <p>{message}</p>}
      {studentDetails && (
        <div className="student-details">
          <h3>Student Details</h3>
          {studentDetails.image && (
            <img src={`http://localhost:3001/uploads/${studentDetails.image}`} alt="Student" width="100" />
          )}
          <p>Name: {studentDetails.name}</p>
          <p>Branch: {studentDetails.branch}</p>
          <p>Year: {studentDetails.year}</p>
          <p>Section: {studentDetails.section}</p>
          <p>Subjects:</p>
          <ul>
            {studentDetails.subjects && studentDetails.subjects.length > 0 ? (
              studentDetails.subjects.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))
            ) : (
              <li>No subjects available</li>
            )}
          </ul>
          
        </div>
      )}
    </div>
  );
};

export default DownloadHallTicket;


