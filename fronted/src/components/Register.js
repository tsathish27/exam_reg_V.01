

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import '../styles/Register.css';
 

// function Register() {
//   const { rollNumber } = useParams();
  
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     rollNumber,
//     name: '',
//     gender: '',
//     email: '',
//     branch: '',
//     year: '',
//     section: '',
//     image: null,
//     subjects: Array(7).fill(''),
//   });
//   const [subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       if (formData.branch && formData.year) {
//         const response = await fetch(`http://localhost:3001/subjects?branch=${formData.branch}&year=${formData.year}`);
//         const data = await response.json();
//         setSubjects(data);
//       }
//     };

//     fetchSubjects();
//   }, [formData.branch, formData.year,formData.section]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleImageChange = (e) => {
//     setFormData({
//       ...formData,
//       image: e.target.files[0]
//     });
//   };

//   const handleSubjectChange = (e, index) => {
//     const updatedSubjects = [...formData.subjects];
//     updatedSubjects[index] = e.target.value;
//     setFormData({
//       ...formData,
//       subjects: updatedSubjects
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }
//     const response = await fetch('http://localhost:3001/register', {
//       method: 'POST',
//       body: formDataToSend,
//     });
//     const data = await response.json();
//     if (data.success) {
//       alert('Registration successful! Wait for your hall ticket. All the best.');
//       navigate('/');
//     } else {
//       alert('Registration failed: ' + data.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Roll Number: </label>
//           <input type="text" value={rollNumber} disabled />
//         </div>
//         <div>
//           <label>Name: </label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Gender: </label>
//           <input
//             type="text"
//             name="gender"
//             placeholder="Enter your gender"
//             value={formData.gender}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email: </label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Branch: </label>
//           <input
//             type="text"
//             name="branch"
//             placeholder="Enter your branch"
//             value={formData.branch}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Year: </label>
//           <input
//             type="text"
//             name="year"
//             placeholder="Enter your year"
//             value={formData.year}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Section: </label>
//           <input
//             type="text"
//             name="section"
//             placeholder="Enter your section"
//             value={formData.section}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Upload Image: </label>
//           <input
//             type="file"
//             name="image"
//             onChange={handleImageChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Subjects: </label>
//           {Array(7).fill().map((_, index) => (
//             <select
//               key={index}
//               value={formData.subjects[index] || ''}
//               onChange={(e) => handleSubjectChange(e, index)}
//               required
//             >
//               <option value="">Select Subject</option>
//               {subjects.map(subject => (
//                 <option key={subject} value={subject}>{subject}</option>
//               ))}
//             </select>
//           ))}
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// // import '../styles/Register.css'; // Adjust the path if necessary

// function Register() {
//   const { rollNumber } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     rollNumber,
//     name: '',
//     gender: '',
//     email: '',
//     branch: '',
//     year: '',
//     section: '',
//     image: null,
//     subjects: Array(7).fill(''),
//   });
//   const [subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       if (formData.branch && formData.year) {
//         const response = await fetch(`http://localhost:3001/subjects?branch=${formData.branch}&year=${formData.year}`);
//         const data = await response.json();
//         setSubjects(data);
//       }
//     };

//     fetchSubjects();
//   }, [formData.branch, formData.year, formData.section]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleImageChange = (e) => {
//     setFormData({
//       ...formData,
//       image: e.target.files[0]
//     });
//   };

//   const handleSubjectChange = (e, index) => {
//     const updatedSubjects = [...formData.subjects];
//     updatedSubjects[index] = e.target.value;
//     setFormData({
//       ...formData,
//       subjects: updatedSubjects
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }
//     const response = await fetch('http://localhost:3001/register', {
//       method: 'POST',
//       body: formDataToSend,
//     });
//     const data = await response.json();
//     if (data.success) {
//       alert('Registration successful! Wait for your hall ticket. All the best.');
//       navigate('/');
//     } else {
//       alert('Registration failed: ' + data.message);
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Roll Number:</label>
//           <input type="text" value={rollNumber} disabled />
//         </div>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter your name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Gender:</label>
//           <input
//             type="text"
//             name="gender"
//             placeholder="Enter your gender"
//             value={formData.gender}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Branch:</label>
//           <input
//             type="text"
//             name="branch"
//             placeholder="Enter your branch"
//             value={formData.branch}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Year:</label>
//           <input
//             type="text"
//             name="year"
//             placeholder="Enter your year"
//             value={formData.year}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Section:</label>
//           <input
//             type="text"
//             name="section"
//             placeholder="Enter your section"
//             value={formData.section}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Upload Image:</label>
//           <input
//             type="file"
//             name="image"
//             onChange={handleImageChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Subjects:</label>
//           {Array(7).fill().map((_, index) => (
//             <select
//               key={index}
//               value={formData.subjects[index] || ''}
//               onChange={(e) => handleSubjectChange(e, index)}
//               required
//             >
//               <option value="">Select Subject</option>
//               {subjects.map(subject => (
//                 <option key={subject} value={subject}>{subject}</option>
//               ))}
//             </select>
//           ))}
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const { rollNumber } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rollNumber,
    name: '',
    gender: '',
    email: '',
    branch: '',
    year: '',
    section: '',
    image: null,
    subjects: [],
  });
  const [subjects, setSubjects] = useState([]);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchSubjects = async () => {
      if (formData.branch && formData.year) {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:3001/subjects?branch=${formData.branch}&year=${formData.year}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setSubjects(data);
        } catch (error) {
          console.error('Failed to fetch subjects:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSubjects();
  }, [formData.branch, formData.year]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // const handleSubjectChange = (e) => {
  //   const { value, checked } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     subjects: checked
  //       ? [...prevData.subjects, value]
  //       : prevData.subjects.filter(subject => subject !== value),
  //   }));
  // };
  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      let updatedSubjects = [...prevData.subjects];
      if (checked) {
        if (!updatedSubjects.includes(value)) {
          updatedSubjects.push(value);
        }
      } else {
        updatedSubjects = updatedSubjects.filter(subject => subject !== value);
      }
      return { ...prevData, subjects: updatedSubjects };
    });
  };
  

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.section) newErrors.section = 'Section is required';
    if (!formData.image) newErrors.image = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
    const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    try {
      setLoading(true);
  
      const checkResponse = await fetch(`http://localhost:3001/check_registration?rollNumber=${rollNumber}`);
      
      if (!checkResponse.ok) {
        throw new Error(`Check Registration failed: ${checkResponse.status} ${checkResponse.statusText}`);
      }
      
      const checkData = await checkResponse.json();
      if (checkData.registered) {
        setAlreadyRegistered(true);
        return;
      }
  
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === 'subjects') {
          formDataToSend.append(key, formData[key].join(','));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
  
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (!response.ok) {
        throw new Error(`Registration failed: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      if (data.success) {
        alert('Registration successful! Wait for your hall ticket. All the best.');
        navigate('/');
      } else {
        alert('Registration failed: ' + data.message);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      alert('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-left">
          <div className="form-group">
            <label>Roll Number: </label>
            <input type="text" value={rollNumber} disabled />
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Gender: </label>
            <input
              type="text"
              name="gender"
              placeholder="Enter your gender"
              value={formData.gender}
              onChange={handleChange}
            />
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Branch: </label>
            <input
              type="text"
              name="branch"
              placeholder="Enter your branch"
              value={formData.branch}
              onChange={handleChange}
            />
            {errors.branch && <span className="error">{errors.branch}</span>}
          </div>
          <div className="form-group">
            <label>Year & Semester: </label>
            <input
              type="text"
              name="year"
              placeholder="Enter your year & Semester(Ex: 3-1)"
              value={formData.year}
              onChange={handleChange}
            />
            {errors.year && <span className="error">{errors.year}</span>}
          </div>
          <div className="form-group">
            <label>Section: </label>
            <input
              type="text"
              name="section"
              placeholder="Enter your section"
              value={formData.section}
              onChange={handleChange}
            />
            {errors.section && <span className="error">{errors.section}</span>}
          </div>
          <div className="form-group">
            <label>Upload Image: </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
            {errors.image && <span className="error">{errors.image}</span>}
          </div>
        </div>
        <div className="form-right">
          <div className="form-group subjects">
            <label>Subjects: </label>
            {loading ? (
              <p>Loading subjects...</p>
            ) : (
              subjects.map((subject) => (
                <div key={subject} className="subject-checkbox">
                  <input
                    type="checkbox"
                    value={subject}
                    onChange={handleSubjectChange}
                  />
                  <label>{subject}</label>
                </div>
              ))
            )}
          </div>
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
      {alreadyRegistered && (
        <div className="popup">
          <div className="popup-content">
            <p>This roll number is already registered!</p>
            <button onClick={() => setAlreadyRegistered(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;

