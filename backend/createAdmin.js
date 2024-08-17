const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Connect to MongoDB

mongoose.connect('mongodb://127.0.0.1:27017/examreg')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Admin = mongoose.model('Admin', adminSchema);

// Create Admin
const createAdmin = async () => {
  const username = 'admin';  
  const password = 'password123';  

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    username,
    password: hashedPassword
  });

  await admin.save();
  console.log('Admin created successfully');
  mongoose.connection.close();
};

createAdmin();
