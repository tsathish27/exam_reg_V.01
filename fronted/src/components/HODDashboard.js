import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HODDashboard.css';  

function HODDashboard() {
  const [students, setStudents] = useState([]);
  const [filterSection, setFilterSection] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const navigate = useNavigate();

  const fetchStudents = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/students?section=${filterSection}&year=${filterYear}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setStudents(data);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }, [filterSection, filterYear]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // const handleApprove = async (rollNumber) => {
  //   const token = localStorage.getItem('token');
  //   try {
  //     const response = await fetch('http://localhost:3001/approve', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify({ rollNumber }),
  //     });
  //     const data = await response.json();
  //     if (data.success) {
  //       alert(data.message);
  //       fetchStudents(); // Re-fetch students
  //     } else {
  //       alert(data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error approving student:', error);
  //     alert('An error occurred while approving the student.');
  //   }
  // };

  const handleApprove = async (rollNumber) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rollNumber }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(data.message);
        
        // Automatically generate and send the hall ticket
        const ticketResponse = await fetch('http://localhost:3001/generate-ticket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ rollNumber })
        });
        
        const ticketData = await ticketResponse.json();
        
        if (ticketData.success) {
          alert('Hall ticket generated and sent via email.');
        } else {
          alert('Hall ticket generation failed: ' + ticketData.message);
        }
  
        fetchStudents(); // Re-fetch students
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error approving student:', error);
      alert('An error occurred while approving the student.');
    }
  };
  

  const handleReject = async (rollNumber) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/reject', {  // Corrected endpoint
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rollNumber }),
      });
      const data = await response.json();
      if (data.success) {
        setStudents(students.filter(student => student.rollNumber !== rollNumber)); // Update state
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error rejecting student:', error);
      alert('An error occurred while rejecting the student.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('branch');
    navigate('/hod-login');
  };

  const departmentName = 'CSE';

  return (
    <div className="dashboard-container">
      <h2>{departmentName} HOD Dashboard</h2>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="filter-container">
        <label>
          Filter by Section:
          <input
            type="text"
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
            className="filter-input"
          />
        </label>
        <label>
          Filter by Year:
          <input
            type="text"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="filter-input"
          />
        </label>
      </div>
      <div className="table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Section</th>
              <th>Eligible</th>
              <th>Approved</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>{student.gender}</td>
                <td>{student.branch}</td>
                <td>{student.year}</td>
                <td>{student.section}</td>
                <td>{student.eligible ? 'No' : 'Yes'}</td>
                <td>{student.approved ? 'Yes' : 'No'}</td>
                <td>
                  {!student.approved && (
                    <>
                      <button className="approve-button" onClick={() => handleApprove(student.rollNumber)}>Approve</button>
                      <button className="reject-button" onClick={() => handleReject(student.rollNumber)}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HODDashboard;
