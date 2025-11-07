import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState('students');
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [filters, setFilters] = useState({
    year: '',
    branch: '',
    section: '',
    examRegistered: ''
  });
  const [subjectFilters, setSubjectFilters] = useState({
    branch: '',
    year: '',
    semester: '',
    search: ''
  });
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingSubject, setEditingSubject] = useState(null);
  const [subjectForm, setSubjectForm] = useState({
    subjectCode: '',
    subjectName: '',
    branch: '',
    year: '',
    semester: '',
    credits: 3,
    isActive: true
  });
  const [studentForm, setStudentForm] = useState({
    rollNumber: '',
    name: '',
    gender: '',
    email: '',
    branch: '',
    year: '',
    section: '',
    attendance: 0
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch students on component mount
  useEffect(() => {
    if (activeTab === 'students') {
      fetchStudents();
    } else if (activeTab === 'subjects') {
      fetchSubjects();
    }
  }, [activeTab, token]);

  // Fetch students
    const fetchStudents = async () => {
    setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/admin/students', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStudents(response.data);
      setFilteredStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students', error);
      setMessage('Failed to fetch students: ' + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };

  // Fetch subjects
  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/admin/subjects', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: subjectFilters
      });
      setSubjects(response.data.subjects || response.data);
      setFilteredSubjects(response.data.subjects || response.data);
    } catch (error) {
      console.error('Failed to fetch subjects', error);
      setMessage('Failed to fetch subjects: ' + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };

  // Handle file change for uploading students
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Upload students via Excel file
  const handleUploadStudents = async () => {
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:3001/admin/upload-students', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Students uploaded successfully');
      fetchStudents();
    } catch (error) {
      console.error('Upload failed', error);
      setMessage('Failed to upload students');
    }
  };

  // Upload subjects via Excel file
  const handleUploadSubjects = async () => {
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:3001/admin/upload-subjects', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Subjects uploaded successfully');
      fetchSubjects();
    } catch (error) {
      console.error('Upload failed', error);
      setMessage('Failed to upload subjects');
    }
  };

  // Handle filter change for students
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle filter change for subjects
  const handleSubjectFilterChange = (e) => {
    const { name, value } = e.target;
    setSubjectFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter students based on selected criteria
  useEffect(() => {
    const applyFilters = () => {
      let filtered = students;
      if (filters.year) {
        filtered = filtered.filter(student => student.year === filters.year);
      }
      if (filters.branch) {
        filtered = filtered.filter(student => student.branch === filters.branch);
      }
      if (filters.section) {
        filtered = filtered.filter(student => student.section === filters.section);
      }
      if (filters.examRegistered) {
        filtered = filtered.filter(student => 
          filters.examRegistered === 'yes' 
          ? student.examRegistered === true 
          : student.examRegistered === false
        );
      }
      setFilteredStudents(filtered);
    };

    applyFilters();
  }, [filters, students]);

  // Filter subjects based on selected criteria
  useEffect(() => {
    const applySubjectFilters = () => {
      let filtered = subjects;
      if (subjectFilters.branch) {
        filtered = filtered.filter(subject => subject.branch === subjectFilters.branch);
      }
      if (subjectFilters.year) {
        filtered = filtered.filter(subject => subject.year === subjectFilters.year);
      }
      if (subjectFilters.semester) {
        filtered = filtered.filter(subject => subject.semester === subjectFilters.semester);
      }
      if (subjectFilters.search) {
        filtered = filtered.filter(subject => 
          subject.subjectCode.toLowerCase().includes(subjectFilters.search.toLowerCase()) ||
          subject.subjectName.toLowerCase().includes(subjectFilters.search.toLowerCase())
        );
      }
      setFilteredSubjects(filtered);
    };

    applySubjectFilters();
  }, [subjectFilters, subjects]);

  // Handle subject form change
  const handleSubjectFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSubjectForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle student form change
  const handleStudentFormChange = (e) => {
    const { name, value } = e.target;
    setStudentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/admin/students', studentForm, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setMessage('Student added successfully');
      setShowAddStudent(false);
      setStudentForm({
        rollNumber: '',
        name: '',
        gender: '',
        email: '',
        branch: '',
        year: '',
        section: '',
        attendance: 0
      });
      fetchStudents();
    } catch (error) {
      console.error('Failed to add student', error);
      setMessage('Failed to add student: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  // Edit student
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({
      rollNumber: student.rollNumber,
      name: student.name,
      gender: student.gender,
      email: student.email,
      branch: student.branch,
      year: student.year,
      section: student.section,
      attendance: student.attendance
    });
    setShowAddStudent(true);
  };

  // Update student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/admin/students/${editingStudent._id}`, studentForm, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setMessage('Student updated successfully');
      setShowAddStudent(false);
      setEditingStudent(null);
      setStudentForm({
        rollNumber: '',
        name: '',
        gender: '',
        email: '',
        branch: '',
        year: '',
        section: '',
        attendance: 0
      });
      fetchStudents();
    } catch (error) {
      console.error('Failed to update student', error);
      setMessage('Failed to update student: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  // Update student eligibility
  const handleUpdateEligibility = async (studentId, eligible) => {
    try {
      await axios.put(`http://localhost:3001/admin/students/${studentId}/eligibility`, 
        { eligible }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setMessage('Student eligibility updated successfully');
      fetchStudents();
    } catch (error) {
      console.error('Failed to update eligibility', error);
      setMessage('Failed to update eligibility: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  // Add new subject
  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/admin/subjects', subjectForm, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setMessage('Subject added successfully');
      setShowAddSubject(false);
      setSubjectForm({
        subjectCode: '',
        subjectName: '',
        branch: '',
        year: '',
        semester: '',
        credits: 3,
        isActive: true
      });
      fetchSubjects();
    } catch (error) {
      console.error('Failed to add subject', error);
      setMessage('Failed to add subject: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  // Edit subject
  const handleEditSubject = (subject) => {
    setEditingSubject(subject);
    setSubjectForm({
      subjectCode: subject.subjectCode,
      subjectName: subject.subjectName,
      branch: subject.branch,
      year: subject.year,
      semester: subject.semester,
      credits: subject.credits,
      isActive: subject.isActive
    });
    setShowAddSubject(true);
  };

  // Update subject
  const handleUpdateSubject = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/admin/subjects/${editingSubject._id}`, subjectForm, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setMessage('Subject updated successfully');
      setShowAddSubject(false);
      setEditingSubject(null);
      setSubjectForm({
        subjectCode: '',
        subjectName: '',
        branch: '',
        year: '',
        semester: '',
        credits: 3,
        isActive: true
      });
      fetchSubjects();
    } catch (error) {
      console.error('Failed to update subject', error);
      setMessage('Failed to update subject: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  // Delete subject
  const handleDeleteSubject = async (subjectId) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await axios.delete(`http://localhost:3001/admin/subjects/${subjectId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMessage('Subject deleted successfully');
        fetchSubjects();
      } catch (error) {
        console.error('Failed to delete subject', error);
        setMessage('Failed to delete subject');
      }
    }
  };

  // Cancel form
  const handleCancelForm = () => {
    setShowAddSubject(false);
    setShowAddStudent(false);
    setEditingSubject(null);
    setEditingStudent(null);
    setSubjectForm({
      subjectCode: '',
      subjectName: '',
      branch: '',
      year: '',
      semester: '',
      credits: 3,
      isActive: true
    });
    setStudentForm({
      rollNumber: '',
      name: '',
      gender: '',
      email: '',
      branch: '',
      year: '',
      section: '',
      attendance: 0
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
      <h2>Admin Dashboard</h2>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
      
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={activeTab === 'students' ? 'active' : ''} 
          onClick={() => setActiveTab('students')}
        >
          Student Management
        </button>
        <button 
          className={activeTab === 'subjects' ? 'active' : ''} 
          onClick={() => setActiveTab('subjects')}
        >
          Subject Management
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <div className="message">
          {message}
          <button onClick={() => setMessage('')}>×</button>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="tab-content">
          <h3>Student Management</h3>

      {/* Upload Students */}
          <div className="upload-section">
            <h4>Upload Students</h4>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
            <button onClick={handleUploadStudents} disabled={!file}>
              Upload Students (Excel)
            </button>
          </div>

          {/* Add Single Student */}
          <div className="action-buttons">
            <button onClick={() => setShowAddStudent(true)}>
              Add Single Student
            </button>
          </div>

          {/* Student Filters */}
          <div className="filters">
            <h4>Filter Students</h4>
            <div className="filter-row">
        <label>
          Year:
          <select name="year" value={filters.year} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </label>

        <label>
          Branch:
          <select name="branch" value={filters.branch} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
                  <option value="EEE">EEE</option>
                  <option value="CSD">CSD</option>
          </select>
        </label>

        <label>
          Section:
          <select name="section" value={filters.section} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </label>

        <label>
          Registered for Exam:
          <select name="examRegistered" value={filters.examRegistered} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
            </div>
      </div>

          {/* Students Table */}
          <div className="table-container">
            <h4>Students ({filteredStudents.length})</h4>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="data-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Year</th>
            <th>Branch</th>
            <th>Section</th>
            <th>Attendance</th>
            <th>Eligible</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
                      <tr key={student.rollNumber}>
                        <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>{student.year}</td>
                <td>{student.branch}</td>
                <td>{student.section}</td>
                        <td>{student.attendance}%</td>
                        <td>
                          <span className={student.eligible ? 'eligible' : 'not-eligible'}>
                            {student.eligible ? 'Yes' : 'No'}
                          </span>
                        </td>
                <td>{student.examRegistered ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleEditStudent(student)} className="edit-btn">
                    Edit
                  </button>
                  <button 
                    onClick={() => handleUpdateEligibility(student._id, !student.eligible)}
                    className={student.eligible ? 'make-ineligible-btn' : 'make-eligible-btn'}
                  >
                    {student.eligible ? 'Make Ineligible' : 'Make Eligible'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
                      <td colSpan="9">No students found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Subjects Tab */}
      {activeTab === 'subjects' && (
        <div className="tab-content">
          <h3>Subject Management</h3>
          
          {/* Upload Subjects */}
          <div className="upload-section">
            <h4>Upload Subjects</h4>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
            <button onClick={handleUploadSubjects} disabled={!file}>
              Upload Subjects
            </button>
          </div>

          {/* Add Subject Button */}
          <div className="action-buttons">
            <button onClick={() => setShowAddSubject(true)}>
              Add New Subject
            </button>
          </div>

          {/* Subject Filters */}
          <div className="filters">
            <h4>Filter Subjects</h4>
            <div className="filter-row">
              <label>
                Branch:
                <select name="branch" value={subjectFilters.branch} onChange={handleSubjectFilterChange}>
                  <option value="">All</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIVIL">CIVIL</option>
                  <option value="EEE">EEE</option>
                  <option value="CSD">CSD</option>
                </select>
              </label>

              <label>
                Year:
                <select name="year" value={subjectFilters.year} onChange={handleSubjectFilterChange}>
                  <option value="">All</option>
                  <option value="1-1">1-1</option>
                  <option value="1-2">1-2</option>
                  <option value="2-1">2-1</option>
                  <option value="2-2">2-2</option>
                  <option value="3-1">3-1</option>
                  <option value="3-2">3-2</option>
                  <option value="4-1">4-1</option>
                  <option value="4-2">4-2</option>
                </select>
              </label>

              <label>
                Semester:
                <select name="semester" value={subjectFilters.semester} onChange={handleSubjectFilterChange}>
                  <option value="">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </label>

              <label>
                Search:
                <input 
                  type="text" 
                  name="search" 
                  value={subjectFilters.search} 
                  onChange={handleSubjectFilterChange}
                  placeholder="Search by code or name"
                />
              </label>
            </div>
          </div>

          {/* Add/Edit Subject Form */}
          {showAddSubject && (
            <div className="form-modal">
              <div className="form-content">
                <h4>{editingSubject ? 'Edit Subject' : 'Add New Subject'}</h4>
                <form onSubmit={editingSubject ? handleUpdateSubject : handleAddSubject}>
                  <div className="form-row">
                    <label>
                      Subject Code:
                      <input 
                        type="text" 
                        name="subjectCode" 
                        value={subjectForm.subjectCode} 
                        onChange={handleSubjectFormChange}
                        required
                      />
                    </label>
                    <label>
                      Subject Name:
                      <input 
                        type="text" 
                        name="subjectName" 
                        value={subjectForm.subjectName} 
                        onChange={handleSubjectFormChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Branch:
                      <select name="branch" value={subjectForm.branch} onChange={handleSubjectFormChange} required>
                        <option value="">Select Branch</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="MECH">MECH</option>
                        <option value="CIVIL">CIVIL</option>
                        <option value="EEE">EEE</option>
                        <option value="CSD">CSD</option>
                      </select>
                    </label>
                    <label>
                      Year:
                      <select name="year" value={subjectForm.year} onChange={handleSubjectFormChange} required>
                        <option value="">Select Year</option>
                        <option value="1-1">1-1</option>
                  <option value="1-2">1-2</option>
                  <option value="2-1">2-1</option>
                  <option value="2-2">2-2</option>
                  <option value="3-1">3-1</option>
                  <option value="3-2">3-2</option>
                  <option value="4-1">4-1</option>
                  <option value="4-2">4-2</option>
                      </select>
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Semester:
                      <select name="semester" value={subjectForm.semester} onChange={handleSubjectFormChange} required>
                        <option value="">Select Semester</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </label>
                    <label>
                      Credits:
                      <input 
                        type="number" 
                        name="credits" 
                        value={subjectForm.credits} 
                        onChange={handleSubjectFormChange}
                        min="1"
                        max="6"
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        name="isActive" 
                        checked={subjectForm.isActive} 
                        onChange={handleSubjectFormChange}
                      />
                      Active
                    </label>
                  </div>
                  <div className="form-actions">
                    <button type="submit">{editingSubject ? 'Update' : 'Add'} Subject</button>
                    <button type="button" onClick={handleCancelForm}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Add/Edit Student Form */}
          {showAddStudent && (
            <div className="form-modal">
              <div className="form-content">
                <h4>{editingStudent ? 'Edit Student' : 'Add New Student'}</h4>
                <form onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}>
                  <div className="form-row">
                    <label>
                      Roll Number:
                      <input 
                        type="text" 
                        name="rollNumber" 
                        value={studentForm.rollNumber} 
                        onChange={handleStudentFormChange}
                        required
                      />
                    </label>
                    <label>
                      Name:
                      <input 
                        type="text" 
                        name="name" 
                        value={studentForm.name} 
                        onChange={handleStudentFormChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Gender:
                      <select name="gender" value={studentForm.gender} onChange={handleStudentFormChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </label>
                    <label>
                      Email:
                      <input 
                        type="email" 
                        name="email" 
                        value={studentForm.email} 
                        onChange={handleStudentFormChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Branch:
                      <select name="branch" value={studentForm.branch} onChange={handleStudentFormChange} required>
                        <option value="">Select Branch</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="MECH">MECH</option>
                        <option value="CIVIL">CIVIL</option>
                        <option value="EEE">EEE</option>
                        <option value="CSD">CSD</option>
                      </select>
                    </label>
                    <label>
                      Year:
                      <select name="year" value={studentForm.year} onChange={handleStudentFormChange} required>
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      Section:
                      <select name="section" value={studentForm.section} onChange={handleStudentFormChange} required>
                        <option value="">Select Section</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </label>
                    <label>
                      Attendance (%):
                      <input 
                        type="number" 
                        name="attendance" 
                        value={studentForm.attendance} 
                        onChange={handleStudentFormChange}
                        min="0"
                        max="100"
                        required
                      />
                    </label>
                  </div>
                  <div className="form-actions">
                    <button type="submit">{editingStudent ? 'Update' : 'Add'} Student</button>
                    <button type="button" onClick={handleCancelForm}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Subjects Table */}
          <div className="table-container">
            <h4>Subjects ({filteredSubjects.length})</h4>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Subject Code</th>
                    <th>Subject Name</th>
                    <th>Branch</th>
                    <th>Year</th>
                    <th>Semester</th>
                    <th>Credits</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map((subject) => (
                      <tr key={subject._id}>
                        <td>{subject.subjectCode}</td>
                        <td>{subject.subjectName}</td>
                        <td>{subject.branch}</td>
                        <td>{subject.year}</td>
                        <td>{subject.semester}</td>
                        <td>{subject.credits}</td>
                        <td>{subject.isActive ? 'Active' : 'Inactive'}</td>
                        <td>
                          <button onClick={() => handleEditSubject(subject)}>Edit</button>
                          <button onClick={() => handleDeleteSubject(subject._id)} className="delete-btn">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No subjects found</td>
            </tr>
          )}
        </tbody>
      </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;