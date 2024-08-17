import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = ({ token }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:3001/admin/upload-students', formData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Students uploaded successfully');
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Students</button>
    </div>
  );
};

export default AdminDashboard;
