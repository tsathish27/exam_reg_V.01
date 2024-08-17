import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import '../styles/Check.css'


function CheckEligibility() {
  const [rollNumber, setRollNumber] = useState('');
  const navigate = useNavigate();

  const handleCheckEligibility = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/check-eligibility/${rollNumber}`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.eligible) {
        navigate(`/register/${rollNumber}`);
      } else {
        alert('You are not eligible to register.either student not found');
      
      }
    } catch (error) {
      console.error('Error checking eligibility:', error);
      alert('Failed to check eligibility. Please try again later.');
    }
  };

  return (
    <div className='ce1'>
      <h2>Check Eligibility</h2>
      <form onSubmit={handleCheckEligibility}>
        <input
          type="text"
          placeholder="Enter your roll number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />
        <button type="submit">Check</button>
      </form>
    </div>
  );
}

export default CheckEligibility;
