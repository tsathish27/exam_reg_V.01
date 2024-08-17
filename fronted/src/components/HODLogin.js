// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/HODLogin.css'; // Adjust the path as needed

// function HODLogin() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/hod-login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('branch', data.branch);
//         navigate('/hod-dashboard'); // Redirect to dashboard or another page
//       } else {
//         // Handle login error
//         console.error(data.message);
//         alert(data.message); // Show error message to user
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('An error occurred during login. Please try again.');
//     }
//   };

//   return (
    
//     <div className="hod-login-container">
//       <div className='back-btn'>
//         <button onClick={() => navigate('/')} className='back-btn'>Back</button>
//       </div>
      
//       <h2 className="hod-login-title">HOD Login</h2>
//       <div className="hod-login-form">
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           className="hod-login-input"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="hod-login-input"
//         />
//         <button
//           onClick={handleLogin}
//           className="hod-login-button"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

// export default HODLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HODLogin.css'; // Adjust the path as needed

function HODLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/hod/login', { // Corrected endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // If the response is not OK (status code is not 2xx), throw an error
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('branch', data.branch);
        navigate('/hod-dashboard'); // Redirect to dashboard or another page
      } else {
        // Handle login error
        console.error(data.message);
        alert(data.message); // Show error message to user
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="hod-login-container">
      <div className='back-btn'>
        <button onClick={() => navigate('/')} className='back-btn'>Back</button>
      </div>
      
      <h2 className="hod-login-title">HOD Login</h2>
      <div className="hod-login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="hod-login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="hod-login-input"
        />
        <button
          onClick={handleLogin}
          className="hod-login-button"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default HODLogin;
