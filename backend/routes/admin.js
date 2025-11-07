const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
const router = express.Router();
const Subject = require('../models/Subject');

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  const jwt = require('jsonwebtoken');
  const SECRET_KEY = process.env.SECRET_KEY || 'my_super_secret_key_12345';

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error('Admin JWT Error:', err);
      return res.status(403).json({ success: false, message: 'Invalid token.' });
    }

    req.admin = user;
    next();
  });
};

// Check if the model is already compiled to avoid OverwriteModelError
const Student = mongoose.models.Student || mongoose.model('Student', new mongoose.Schema({
    rollNumber: String,
    name: String,
    gender: String,
    email: String,
    branch: String,
    year: String,
    section: String,
    attendance: Number, // Added attendance field
    eligible: Boolean,
    approved: Boolean,
    examRegistered: { type: Boolean, default: false }, // Added exam registration field
}));

// Set up Multer for file upload
const upload = multer({ dest: 'uploads/' }); // Upload destination

// Route to fetch all students (supports filtering by year, branch, section)
router.get('/students', authenticateAdmin, async (req, res) => {
  try {
    const { year, branch, section, examRegistered } = req.query;
    let query = {};

    // Apply filters if provided
    if (year) query.year = year;
    if (branch) query.branch = branch;
    if (section) query.section = section;
    if (examRegistered) {
      query.examRegistered = examRegistered === 'yes';
    }

    // Fetch students based on the query
    const students = await Student.find(query);
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
});

// Add single student
router.post('/students', authenticateAdmin, async (req, res) => {
  try {
    const { rollNumber, name, gender, email, branch, year, section, attendance } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this roll number already exists' });
    }

    const student = new Student({
      rollNumber,
      name,
      gender,
      email,
      branch,
      year,
      section,
      attendance: attendance || 0,
      eligible: (attendance || 0) >= 75,
      approved: false,
      examRegistered: false
    });

    await student.save();
    res.json({ message: 'Student added successfully', student });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Failed to add student' });
  }
});

// Update student
router.put('/students/:id', authenticateAdmin, async (req, res) => {
  try {
    const { name, gender, email, branch, year, section, attendance } = req.body;
    
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { 
        name, 
        gender, 
        email, 
        branch, 
        year, 
        section, 
        attendance,
        eligible: (attendance || 0) >= 75 // Update eligibility based on attendance
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully', student });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Failed to update student' });
  }
});

// Update student eligibility
router.put('/students/:id/eligibility', authenticateAdmin, async (req, res) => {
  try {
    const { eligible } = req.body;
    
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { eligible },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student eligibility updated successfully', student });
  } catch (error) {
    console.error('Error updating student eligibility:', error);
    res.status(500).json({ message: 'Failed to update student eligibility' });
  }
});

// Route to upload Excel sheet and add students to the database
router.post('/upload-students', authenticateAdmin, upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // First sheet
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Insert each student from the sheet into the database
    const students = sheetData.map(row => ({
      rollNumber: row['Roll No'],
      name: row['Name'],
      gender: row['Gender'],
      email: row['Email'],
      branch: row['Branch'],
      year: row['Year'],
      section: row['Section'],
      attendance: row['Attendance (%)'], // Adjusted to match your schema
      eligible: row['Attendance (%)'] >= 75, // Automatically set eligible based on attendance
      approved: false, // Initially not approved
      examRegistered: false, // Initially not registered for exam
    }));

    await Student.insertMany(students);
    res.json({ message: 'Students uploaded successfully' });
  } catch (error) {
    console.error('Error uploading students:', error);
    res.status(500).json({ message: 'Failed to upload students' });
  }
});

// Subject Management Routes

// Get all subjects with pagination and filtering
router.get('/subjects', authenticateAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10, branch, year, semester, search } = req.query;
    const query = {};

    // Apply filters
    if (branch) query.branch = branch;
    if (year) query.year = year;
    if (semester) query.semester = semester;
    if (search) {
      query.$or = [
        { subjectCode: { $regex: search, $options: 'i' } },
        { subjectName: { $regex: search, $options: 'i' } }
      ];
    }

    const subjects = await Subject.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Subject.countDocuments(query);

    res.json({
      subjects,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: 'Failed to fetch subjects' });
  }
});

// Add new subject
router.post('/subjects', authenticateAdmin, async (req, res) => {
  try {
    const { subjectCode, subjectName, branch, year, semester, credits } = req.body;

    // Check if subject already exists
    const existingSubject = await Subject.findOne({ subjectCode });
    if (existingSubject) {
      return res.status(400).json({ message: 'Subject with this code already exists' });
    }

    const subject = new Subject({
      subjectCode,
      subjectName,
      branch,
      year,
      semester,
      credits: credits || 3
    });

    await subject.save();
    res.json({ message: 'Subject added successfully', subject });
  } catch (error) {
    console.error('Error adding subject:', error);
    res.status(500).json({ message: 'Failed to add subject' });
  }
});

// Update subject
router.put('/subjects/:id', authenticateAdmin, async (req, res) => {
  try {
    const { subjectCode, subjectName, branch, year, semester, credits, isActive } = req.body;
    
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { subjectCode, subjectName, branch, year, semester, credits, isActive },
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json({ message: 'Subject updated successfully', subject });
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).json({ message: 'Failed to update subject' });
  }
});

// Delete subject
router.delete('/subjects/:id', authenticateAdmin, async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({ message: 'Failed to delete subject' });
  }
});

// Get subjects by branch and year (for registration form)
router.get('/subjects/by-branch-year', authenticateAdmin, async (req, res) => {
  try {
    const { branch, year } = req.query;
    
    if (!branch || !year) {
      return res.status(400).json({ message: 'Branch and year are required' });
    }

    const subjects = await Subject.find({ 
      branch, 
      year, 
      isActive: true 
    }).select('subjectCode subjectName credits');

    res.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects by branch and year:', error);
    res.status(500).json({ message: 'Failed to fetch subjects' });
  }
});

// Bulk upload subjects from Excel
router.post('/upload-subjects', authenticateAdmin, upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Process subjects data
    const subjects = sheetData.map(row => ({
      subjectCode: row['Subject Code'] || row['Code'],
      subjectName: row['Subject Name'] || row['Name'],
      branch: row['Branch'],
      year: row['Year'],
      semester: row['Semester'],
      credits: row['Credits'] || 3,
      isActive: true
    }));

    // Insert subjects (ignore duplicates)
    const result = await Subject.insertMany(subjects, { ordered: false });
    res.json({ 
      message: 'Subjects uploaded successfully', 
      count: result.length,
      duplicates: subjects.length - result.length
    });
  } catch (error) {
    console.error('Error uploading subjects:', error);
    res.status(500).json({ message: 'Failed to upload subjects' });
  }
});

module.exports = router;
