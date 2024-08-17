// import axios from 'axios';

// const API_URL = 'http://localhost:3001';

// export const checkRollNumber = (rollNumber) => {
//     return axios.post(`${API_URL}/checkRollNumber`, { rollNumber });
// };

// export const registerStudent = (studentData) => {
//     return axios.post(`${API_URL}/register`, studentData);
// };

// export const loginHOD = (credentials) => {
//     return axios.post(`${API_URL}/login`, credentials);
// };

// export const getStudents = (token) => {
//     return axios.get(`${API_URL}/students`, {
//         headers: {
//             Authorization: token,
//         },
//     });
// };

// export const approveStudent = (rollNumber, token) => {
//     return axios.post(`${API_URL}/approve`, { rollNumber }, {
//         headers: {
//             Authorization: token,
//         },
//     });
// };

// export const downloadHallTicket = (rollNumber) => {
//     return axios.get(`${API_URL}/hall-ticket/${rollNumber}`, { responseType: 'blob' });
// };

import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getStudentDetails = async (rollNumber) => {
  try {
    const response = await axios.get(`${API_URL}/students/${rollNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student details:', error);
    throw new Error('Failed to fetch student details');
  }
};

export const downloadHallTicket = async (rollNumber) => {
  try {
    const response = await axios.get(`${API_URL}/generate-hall-ticket/${rollNumber}`, { responseType: 'blob' });
    return response;
  } catch (error) {
    console.error('Error downloading hall ticket:', error);
    throw new Error('Failed to download hall ticket');
  }
};


