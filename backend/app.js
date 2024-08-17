

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// // const PDFDocument = require('pdfkit');
// const { PDFDocument, rgb } = require('pdf-lib');
 


// dotenv.config();

// const getSubjects = require('./subjects');
// const HOD = require('./models/HOD');

// const app = express();
// const port = process.env.PORT || 3001;
// const SECRET_KEY = process.env.SECRET_KEY || 'my_super_secret_key_12345';

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.sendStatus(401); // Unauthorized
//   }

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) {
//       console.error('JWT Error:', err);
//       return res.sendStatus(403); // Forbidden
//     }

//     req.user = user;
//     next();
//   });
// };

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));

// // Ensure the uploads directory exists
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/examreg', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Define Student Schema
// const studentSchema = new mongoose.Schema({
//   rollNumber: String,
//   name: String,
//   gender: String,
//   email: String,
//   branch: String,
//   year: String,
//   eligible: Boolean,
//   approved: Boolean,
// });

// const Student = mongoose.model('Student', studentSchema);

// // Define Registration Schema and Model
// const registrationSchema = new mongoose.Schema({
//   rollNumber: String,
//   name: String,
//   gender: String,
//   email: String,
//   branch: String,
//   year: String,
//   section: String,
//   image: String,
//   subjects: [String],
//   approved: { type: Boolean, default: false }
// });

// const Registration = mongoose.model('Registration', registrationSchema);

// // Check registration endpoint
// app.get('/check_registration', async (req, res) => {
//   try {
//     const { rollNumber } = req.query;
//     const existingStudent = await Registration.findOne({ rollNumber });
    
//     if (existingStudent) {
//       return res.json({ registered: true });
//     } else {
//       return res.json({ registered: false });
//     }
//   } catch (error) {
//     console.error('Check registration error:', error);
//     res.status(500).json({ success: false, message: 'Error checking registration' });
//   }
// });

// // Register endpoint
// app.post('/register', upload.single('image'), async (req, res) => {
//   try {
//     const { rollNumber, name, gender, email, branch, year, section, subjects } = req.body;

//     const existingStudent = await Registration.findOne({ rollNumber });
//     if (existingStudent) {
//       return res.status(400).json({ success: false, message: 'Roll number already registered' });
//     }

//     // Deduplicate subjects
//     const uniqueSubjects = [...new Set(subjects.split(','))];

//     const newRegistration = new Registration({
//       rollNumber,
//       name,
//       gender,
//       email,
//       branch,
//       year,
//       section,
//       image: req.file ? req.file.filename : null,
//       subjects: uniqueSubjects,
//     });

//     await newRegistration.save();
//     res.json({ success: true, message: 'Registration successful' });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ success: false, message: 'Registration failed' });
//   }
// });

// // Define the route to fetch subjects based on branch and year
// app.get('/subjects', (req, res) => {
//   const { branch, year } = req.query;
//   const subjects = getSubjects(branch, year);
//   res.json(subjects);
// });

// // Endpoint to check eligibility
// app.get('/check-eligibility/:rollNumber', async (req, res) => {
//   const rollNumber = req.params.rollNumber;
//   console.log(`Checking eligibility for roll number: ${rollNumber}`);

//   try {
//     const student = await Student.findOne({ rollNumber });
//     if (student) {
//       console.log(`Student found: ${JSON.stringify(student)}`);
//       res.json({ eligible: student.eligible });
//     } else {
//       console.log(`Student with roll number ${rollNumber} not found.`);
//       res.status(404).json({ message: 'Student not found' });
//     }
//   } catch (error) {
//     console.error('Error retrieving student:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Endpoint to fetch all student registrations for HOD
// app.get('/students', authenticateToken, async (req, res) => {
//   const { section, year } = req.query;
//   const hodBranch = req.user.branch;

//   try {
//     const query = { branch: hodBranch };

//     if (section) {
//       query.section = section;
//     }
//     if (year) {
//       query.year = year;
//     }

//     const students = await Registration.find(query);
//     res.json(students);
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     res.status(500).json({ message: 'Error fetching students' });
//   }
// });

// // Endpoint to approve a student
// app.post('/approve', authenticateToken, async (req, res) => {
//   const { rollNumber } = req.body;
//   try {
//     const student = await Registration.findOneAndUpdate(
//       { rollNumber },
//       { approved: true },
//       { new: true }
//     );
//     if (student) {
//       console.log('Student approved:', student); // Log the updated student
//       res.json({ success: true, message: 'Student approved', student });
//     } else {
//       res.status(404).json({ success: false, message: 'Student not found' });
//     }
//   } catch (error) {
//     console.error('Error approving student:', error);
//     res.status(500).json({ message: 'Error approving student' });
//   }
// });

// // Endpoint to reject a student
// app.delete('/reject', authenticateToken, async (req, res) => {
//   const { rollNumber } = req.body;
//   try {
//     const student = await Registration.findOneAndDelete({ rollNumber });
//     if (student) {
//       res.json({ success: true, message: 'Student rejected' });
//     } else {
//       res.status(404).json({ success: false, message: 'Student not found' });
//     }
//   } catch (error) {
//     console.error('Error rejecting student:', error);
//     res.status(500).json({ message: 'Error rejecting student' });
//   }
// });

// // Fetch student details by roll number
// app.get('/students/:rollNumber', async (req, res) => {
//   try {
//     const registration = await Registration.findOne({ rollNumber: req.params.rollNumber });
//     if (registration) {
//       res.json(registration);
//     } else {
//       res.status(404).json({ message: 'Student not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching student details:', error);
//     res.status(500).json({ message: 'Error fetching student details' });
//   }
// });

// // // Endpoint to generate hall ticket
// // app.get('/generate-hall-ticket/:rollNumber', async (req, res) => {
// //   const { rollNumber } = req.params;

// //   try {
// //     const student = await Registration.findOne({ rollNumber });
// //     if (!student || !student.approved) {
// //       return res.status(404).send('Student not found or not approved.');
// //     }

// //     const doc = new PDFDocument();
// //     const filePath = path.join(__dirname, 'halltickets', `${rollNumber}.pdf`);

// //     doc.pipe(fs.createWriteStream(filePath));

// //     // Add header image
// //     // doc.image('path/to/image.jpeg', { width: 150, height: 150 });
// //     doc.moveDown();

// //     // Title
// //     doc.fontSize(24).fillColor('#333').text('Hall Ticket', { align: 'center' });
// //     doc.moveDown();

// //     // Student Information
// //     doc.fontSize(14).fillColor('#555');
// //     doc.text(`Roll Number: ${student.rollNumber}`);
// //     doc.text(`Name: ${student.name}`);
// //     doc.text(`Gender: ${student.gender}`);
// //     doc.text(`Branch: ${student.branch}`);
// //     doc.text(`Year: ${student.year}`);
// //     doc.text(`Section: ${student.section}`);
// //     doc.moveDown();

// //     // Calculate the position for the image to be right-aligned
// //     const imagePath = path.join(__dirname, 'uploads', student.image);
// //     const imageWidth = 100;
// //     const imageHeight = 100;
// //     const pageWidth = doc.page.width;
// //     const marginRight = 50;  // Adjust as needed
// //     const xPos = pageWidth - imageWidth - marginRight;
// //     const yPos = doc.y;

// //     doc.image(imagePath, xPos, yPos, { width: imageWidth, height: imageHeight });
// //     doc.moveDown();

// //     // Subjects
// //     doc.fontSize(12).fillColor('#333').text('Subjects:', { continued: true });
// //     student.subjects.forEach((subject, index) => {
// //       doc.text(`${index + 1}. ${subject}`);
// //     });

// //     doc.end();

// //     res.download(filePath, `Hall_Ticket_${rollNumber}.pdf`, (err) => {
// //       if (err) {
// //         console.error('Error sending the file:', err);
// //         res.status(500).send('Error downloading the PDF');
// //       } else {
// //         console.log(`Hall ticket generated for ${rollNumber}`);
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Error generating hall ticket:', error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // Endpoint to fetch a specific student's details
// app.get('/students/:rollNumber', authenticateToken, async (req, res) => {
//   try {
//     const student = await Registration.findOne({ rollNumber: req.params.rollNumber });
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
//     res.json(student);
//   } catch (error) {
//     console.error('Error fetching student details:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Endpoint to add students to the database of eligible students
// app.post('/add-student', authenticateToken, async (req, res) => {
//   const { rollNumber, name } = req.body;
//   try {
//     const newStudent = new Student({
//       rollNumber,
//       name,
//       eligible: true,
//       approved: false,
//     });
//     await newStudent.save();
//     res.json({ success: true, message: 'Student added successfully' });
//   } catch (error) {
//     console.error('Error adding student:', error);
//     res.status(500).json({ success: false, message: 'Error adding student' });
//   }
// });

// // Login endpoint for HODs
// app.post('/hod-login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const hod = await HOD.findOne({ username });
//     if (!hod) {
//       return res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, hod.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: hod._id, branch: hod.branch }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ success: true, token, branch: hod.branch });
//   } catch (error) {
//     console.error('Error during HOD login:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });



// // // const fs = require('fs');
// // const path = require('path');
// // const { PDFDocument, rgb } = require('pdf-lib'); // Ensure pdf-lib is installed

// const generateHallTicket = async (registration) => {
//   try {
//     console.log('Starting PDF generation');
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([600, 800]);

//     const { width, height } = page.getSize();

//     // Resolve paths
//     const logoPath = path.resolve(__dirname, 'assets', 'Designer (2).jpeg');
//     const signaturePath = path.resolve(__dirname, 'assets', 'sttlogo1.png');
//     console.log('Logo Path:', logoPath);
//     console.log('Signature Path:', signaturePath);

//     // Verify if files exist
//     if (!fs.existsSync(logoPath)) {
//       throw new Error(`Logo file not found at path: ${logoPath}`);
//     }
//     if (!fs.existsSync(signaturePath)) {
//       throw new Error(`Signature file not found at path: ${signaturePath}`);
//     }

//     // Add College Logo
//     const logoImage = await pdfDoc.embedJpg(fs.readFileSync(logoPath));
//     page.drawImage(logoImage, { x: 50, y: height - 150, width: 100, height: 100 });

//     // Add College Details
//     page.drawText('MADANAPALLE INSTITUTE OF TECHNOLOGY & SCIENCE', { x: 200, y: height - 100, size: 18, color: rgb(0, 0, 0) });
//     page.drawText('(UGC – AUTONOMOUS INSTITUTION)', { x: 200, y: height - 120, size: 14, color: rgb(0, 0, 0) });
//     page.drawText('MADANAPALLE – 517325 (A.P)', { x: 200, y: height - 140, size: 14, color: rgb(0, 0, 0) });
//     page.drawText('(Affiliated to JNTUA, Ananthapuramu & Approved by AICTE, New Delhi)', { x: 200, y: height - 160, size: 12, color: rgb(0, 0, 0) });

//     // Add Examination Details
//     page.drawText(`Examination Registration - B.Tech – ${registration.year} Year II Semester - R20 Academic Regulations`, { x: 50, y: height - 220, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`The Candidate is appearing for Regular Examinations, Month & Year of Examination:`, { x: 50, y: height - 240, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`H.T. No: ${registration.rollNumber}`, { x: 50, y: height - 260, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Name: ${registration.name}`, { x: 50, y: height - 280, size: 12, color: rgb(0, 0, 0) });

//     // Add Subjects
//     const yPosition = height - 320;
//     registration.subjects.forEach((subject, index) => {
//       page.drawRectangle({ x: 50, y: yPosition - (index * 30), width: 500, height: 25, borderColor: rgb(0, 0, 0) });
//       page.drawText(`${index + 1}. ${subject}`, { x: 55, y: yPosition - (index * 30) + 5, size: 12, color: rgb(0, 0, 0) });
//       page.drawText('Signature of Invigilator:', { x: 500, y: yPosition - (index * 30) + 5, size: 12, color: rgb(0, 0, 0) });
//     });

//     // Add Signature
//     const signatureImage = await pdfDoc.embedPng(fs.readFileSync(signaturePath));
//     page.drawImage(signatureImage, { x: 50, y: 100, width: 100, height: 50 });

//     page.drawText('Signature of the Candidate:', { x: 50, y: 50, size: 12, color: rgb(0, 0, 0) });
//     page.drawText('Controller of Examinations:', { x: 400, y: 50, size: 12, color: rgb(0, 0, 0) });

//     // Add Instructions
//     const instructions = [
//       'Instructions to Candidates:',
//       '1. Display his/her ID card for verification.',
//       '2. The candidate has to confirm himself/herself that he/she does not possess any foreign material, electronic gadgets other than electronic calculator.',
//       '3. Candidates should stay in the examination hall at least half-an-hour from the commencement of the examination.',
//       '4. Be present in the examination hall 15 minutes before the time of commencement of examination. No candidate will be allowed after the commencement of the examination.'
//     ];

//     instructions.forEach((line, index) => {
//       page.drawText(line, { x: 50, y: 100 - (index * 20), size: 12, color: rgb(0, 0, 0) });
//     });

//     const pdfBytes = await pdfDoc.save();

//     // Ensure the output directory exists
//     const outputDir = path.join(__dirname, 'output');
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir);
//     }

//     // Save the PDF to a file for verification
//     const outputPath = path.join(outputDir, `Hall_Ticket_${registration.rollNumber}.pdf`);
//     fs.writeFileSync(outputPath, pdfBytes);
//     console.log(`PDF generated at path: ${outputPath}`);

//     return pdfBytes;
//   } catch (error) {
//     console.error('Error during PDF generation:', error);
//     throw error;
//   }
// };

// // Endpoint to generate hall ticket
// app.get('/generate-hall-ticket/:rollNumber', async (req, res) => {
//   try {
//     const registration = await Registration.findOne({ rollNumber: req.params.rollNumber });
//     if (registration) {
//       const pdfBytes = await generateHallTicket(registration);
//       res.contentType('application/pdf');
//       res.send(pdfBytes);
//     } else {
//       res.status(404).json({ message: 'Student not found' });
//     }
//   } catch (error) {
//     console.error('Error generating hall ticket:', error);
//     res.status(500).json({ message: 'Error generating hall ticket' });
//   }
// });







// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// const { PDFDocument, rgb } = require('pdf-lib');
const generateHallTicket = require('./hallTicketGenerator'); 
require('dotenv').config();

// ... rest of your app.js code



dotenv.config();

const getSubjects = require('./subjects');
const HOD = require('./models/HOD');

const app = express();
const port = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY || 'my_super_secret_key_12345';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error('JWT Error:', err);
      return res.sendStatus(403); // Forbidden
    }

    req.user = user;
    next();
  });
};

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Ensure the output directory exists
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/examreg', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Student Schema
const studentSchema = new mongoose.Schema({
  rollNumber: String,
  name: String,
  gender: String,
  email: String,
  branch: String,
  year: String,
  eligible: Boolean,
  approved: Boolean,
});

const Student = mongoose.model('Student', studentSchema);

// Define Registration Schema and Model
const registrationSchema = new mongoose.Schema({
  rollNumber: String,
  name: String,
  gender: String,
  email: String,
  branch: String,
  year: String,
  section: String,
  image: String,
  subjects: [String],
  approved: { type: Boolean, default: false }
});

const Registration = mongoose.model('Registration', registrationSchema);

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
}); 

const Admin = mongoose.model('Admin', adminSchema);
 

// Check registration endpoint
app.get('/check_registration', async (req, res) => {
  try {
    const { rollNumber } = req.query;
    const existingStudent = await Registration.findOne({ rollNumber });
    
    if (existingStudent) {
      return res.json({ registered: true });
    } else {
      return res.json({ registered: false });
    }
  } catch (error) {
    console.error('Check registration error:', error);
    res.status(500).json({ success: false, message: 'Error checking registration' });
  }
});

// Register endpoint
app.post('/register', upload.single('image'), async (req, res) => {
  try {
    const { rollNumber, name, gender, email, branch, year, section, subjects } = req.body;

    const existingStudent = await Registration.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ success: false, message: 'Roll number already registered' });
    }

    // Deduplicate subjects
    const uniqueSubjects = [...new Set(subjects.split(','))];

    const newRegistration = new Registration({
      rollNumber,
      name,
      gender,
      email,
      branch,
      year,
      section,
      image: req.file ? req.file.filename : null,
      subjects: uniqueSubjects,
    });

    await newRegistration.save();
    res.json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

// Define the route to fetch subjects based on branch and year
app.get('/subjects', (req, res) => {
  const { branch, year } = req.query;
  const subjects = getSubjects(branch, year);
  res.json(subjects);
});

// Endpoint to check eligibility
app.get('/check-eligibility/:rollNumber', async (req, res) => {
  const rollNumber = req.params.rollNumber;
  console.log(`Checking eligibility for roll number: ${rollNumber}`);

  try {
    const student = await Student.findOne({ rollNumber });
    if (student) {
      console.log(`Student found: ${JSON.stringify(student)}`);
      res.json({ eligible: student.eligible });
    } else {
      console.log(`Student with roll number ${rollNumber} not found.`);
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error retrieving student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to fetch all student registrations for HOD
app.get('/students', authenticateToken, async (req, res) => {
  const { section, year } = req.query;
  const hodBranch = req.user.branch;

  try {
    const query = { branch: hodBranch };

    if (section) {
      query.section = section;
    }
    if (year) {
      query.year = year;
    }

    const students = await Registration.find(query);
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Endpoint to approve a student
app.post('/approve', authenticateToken, async (req, res) => {
  const { rollNumber } = req.body;
  try {
    const student = await Registration.findOneAndUpdate(
      { rollNumber },
      { approved: true },
      { new: true }
    );
    if (student) {
      console.log('Student approved:', student); // Log the updated student
      res.json({ success: true, message: 'Student approved', student });
    } else {
      res.status(404).json({ success: false, message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error approving student:', error);
    res.status(500).json({ message: 'Error approving student' });
  }
});

// Endpoint to reject a student
app.delete('/reject', authenticateToken, async (req, res) => {
  const { rollNumber } = req.body;
  try {
    const student = await Registration.findOneAndDelete({ rollNumber });
    if (student) {
      res.json({ success: true, message: 'Student rejected' });
    } else {
      res.status(404).json({ success: false, message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error rejecting student:', error);
    res.status(500).json({ message: 'Error rejecting student' });
  }
});

// Endpoint to generate hall ticket and send via email
app.post('/generate-ticket', authenticateToken, async (req, res) => {
  const { rollNumber } = req.body;
  try {
    const student = await Registration.findOne({ rollNumber });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    if (!student.approved) {
      return res.status(400).json({ success: false, message: 'Student is not approved' });
    }

    // Generate hall ticket
    const hallTicketPath = await generateHallTicket(student);

    // Send hall ticket via email
    if (hallTicketPath) {
      res.json({ success: true, message: 'Hall ticket generated and sent via email', hallTicketPath });
    } else {
      res.status(500).json({ success: false, message: 'Failed to generate hall ticket' });
    }
  } catch (error) {
    console.error('Error generating hall ticket:', error);
    res.status(500).json({ message: 'Error generating hall ticket' });
  }
});


// Fetch student details by roll number
app.get('/students/:rollNumber', async (req, res) => {
  try {
    const registration = await Registration.findOne({ rollNumber: req.params.rollNumber });
    if (registration) {
      res.json(registration);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ message: 'Error fetching student details' });
  }
});

// const generateHallTicket = async (registration) => {
//   try {
//     console.log('Starting PDF generation');
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([600, 800]);

//     const { width, height } = page.getSize();

//     // Resolve paths
//     const logoPath = path.resolve(__dirname, 'assets', 'Designer (2).jpeg');
//     const signaturePath = path.resolve(__dirname, 'assets', 'sttlogo1.png');
//     const imagePath = path.join(__dirname, 'uploads', student.image);
//     const imageWidth = 100;
//     const imageHeight = 100;
//     const pageWidth = doc.page.width;
//     const marginRight = 50;  // Adjust as needed
//     const xPos = pageWidth - imageWidth - marginRight;
//     const yPos = doc.y;

//     doc.image(imagePath, xPos, yPos, { width: imageWidth, height: imageHeight });
//     doc.moveDown();

//     console.log('Logo Path:', logoPath);
//     console.log('Signature Path:', signaturePath);

//     // Verify if files exist
//     if (!fs.existsSync(logoPath)) {
//       throw new Error(`Logo file not found at path: ${logoPath}`);
//     }
//     if (!fs.existsSync(signaturePath)) {
//       throw new Error(`Signature file not found at path: ${signaturePath}`);
//     }

//     // Add College Logo
//     const logoImageBytes = fs.readFileSync(logoPath);
//     const logoImage = await pdfDoc.embedJpg(logoImageBytes);
//     page.drawImage(logoImage, { x: 50, y: height - 150, width: 100, height: 100 });

//     // Add College Details
//     page.drawText('MADANAPALLE INSTITUTE OF TECHNOLOGY & SCIENCE', { x: 200, y: height - 100, size: 18, color: rgb(0, 0, 0) });
//     page.drawText('(UGC – AUTONOMOUS INSTITUTION)', { x: 200, y: height - 120, size: 14, color: rgb(0, 0, 0) });
//     page.drawText('MADANAPALLE – 517325 (A.P)', { x: 200, y: height - 140, size: 14, color: rgb(0, 0, 0) });
//     page.drawText('(Affiliated to JNTUA, Ananthapuramu & Approved by AICTE, New Delhi)', { x: 200, y: height - 160, size: 12, color: rgb(0, 0, 0) });

//     // Add Examination Details
//     page.drawText(`Examination Registration - B.Tech – ${registration.year} Year II Semester - R20 Academic Regulations`, { x: 50, y: height - 220, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`The Candidate is appearing for Regular Examinations, Month & Year of Examination:`, { x: 50, y: height - 240, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`H.T. No: ${registration.rollNumber}`, { x: 50, y: height - 260, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Name: ${registration.name}`, { x: 50, y: height - 280, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Gender: ${registration.gender}`, { x: 50, y: height - 300, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Branch: ${registration.branch}`, { x: 50, y: height - 320, size: 12, color: rgb(0, 0, 0) });
//     page.drawText(`Section: ${registration.section}`, { x: 50, y: height - 340, size: 12, color: rgb(0, 0, 0) });

//     // Add Subjects
//     const yPosition = height - 380;
//     registration.subjects.forEach((subject, index) => {
//       page.drawRectangle({ x: 50, y: yPosition - (index * 30), width: 500, height: 25, borderColor: rgb(0, 0, 0) });
//       page.drawText(`${index + 1}. ${subject}`, { x: 55, y: yPosition - (index * 30) + 5, size: 12, color: rgb(0, 0, 0) });
//       page.drawText('', { x: 400, y: yPosition - (index * 30) + 5, size: 12, color: rgb(0, 0, 0) });
//     });

//     // Add Signature
//     const signatureImageBytes = fs.readFileSync(signaturePath);
//     const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
//     page.drawImage(signatureImage, { x: 50, y: 100, width: 100, height: 50 });

//     page.drawText('Signature of the Candidate:', { x: 50, y: 50, size: 12, color: rgb(0, 0, 0) });
//     page.drawText('Controller of Examinations:', { x: 400, y: 50, size: 12, color: rgb(0, 0, 0) });

//     // Add Instructions
//     const instructions = [
//       'Instructions to Candidates:',
//       '1. Display his/her ID card for verification.',
//       '2. The candidate has to confirm himself/herself that he/she does not possess any foreign material, electronic gadgets other than electronic calculator.',
//       '3. Candidates should stay in the examination hall at least half-an-hour from the commencement of the examination.',
//       '4. Be present in the examination hall 15 minutes before the time of commencement of examination. No candidate will be allowed after the commencement of the examination.'
//     ];

//     instructions.forEach((line, index) => {
//       page.drawText(line, { x: 50, y: 50 - (index * 20), size: 12, color: rgb(0, 0, 0) });
//     });

//     // Save the PDF to a file
//     const pdfBytes = await pdfDoc.save();

//     // Ensure the output directory exists
//     const outputDir = path.join(__dirname, 'halltickets');
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir);
//     }

//     // Define output path
//     const outputPath = path.join(outputDir, `Hall_Ticket_${registration.rollNumber}.pdf`);

//     // Write the PDF file
//     fs.writeFileSync(outputPath, pdfBytes);
//     console.log(`PDF generated at path: ${outputPath}`);

//     return outputPath; // Return path of the generated PDF
//   } catch (error) {
//     console.error('Error during PDF generation:', error);
//     throw error;
//   }
// };

// // Endpoint to generate and download hall ticket
// app.get('/generate-hall-ticket/:rollNumber', async (req, res) => {
//   const rollNumber = req.params.rollNumber;
//   console.log('Generate hall ticket requested for roll number:', rollNumber);

//   try {
//     const registration = await Registration.findOne({ rollNumber });
//     if (!registration) {
//       return res.status(404).json({ message: 'Student not found' });
//     }

//     const filePath = await generateHallTicket(registration);

//     // Set the appropriate headers
//     res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
//     res.setHeader('Content-Type', 'application/pdf');

//     res.sendFile(filePath, err => {
//       if (err) {
//         console.error('Error sending file:', err);
//         res.status(500).json({ message: 'Error sending file' });
//       }
//     });
//   } catch (error) {
//     console.error('Error generating hall ticket:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
 


app.get('/generate-hall-ticket/:rollNumber', async (req, res) => {
  const rollNumber = req.params.rollNumber;
  console.log('Generate hall ticket requested for roll number:', rollNumber);

  try {
    const registration = await Registration.findOne({ rollNumber });
    if (!registration) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const filePath = await generateHallTicket(registration);

    // Set the appropriate headers
    res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
    res.setHeader('Content-Type', 'application/pdf');

    res.sendFile(filePath, err => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ message: 'Error sending file' });
      }
    });
  } catch (error) {
    console.error('Error generating hall ticket:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// HOD registration endpoint
app.post('/hod/register', async (req, res) => {
  const { username, password, branch } = req.body;

  try {
    const existingHOD = await HOD.findOne({ username });
    if (existingHOD) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newHOD = new HOD({ username, password: hashedPassword, branch });
    await newHOD.save();
    res.json({ success: true, message: 'HOD registered successfully' });
  } catch (error) {
    console.error('Error registering HOD:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 


// HOD login endpoint
app.post('/hod/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hod = await HOD.findOne({ username });
    if (!hod) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, hod.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: hod.username, branch: hod.branch }, SECRET_KEY, {
      expiresIn: '1h',
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// //admin
// // Admin Login
// app.post('/admin/login', async (req, res) => {
//   const { username, password } = req.body;
//   const admin = await Admin.findOne({ username });
//   if (admin && bcrypt.compareSync(password, admin.password)) {
//     const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
