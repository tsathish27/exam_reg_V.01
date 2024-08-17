const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const HOD = require('./models/HOD'); // Ensure the correct path

mongoose.connect('mongodb://127.0.0.1:27017/examreg')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

const seedHODs = async () => {
  const hods = [
    { username: 'hod_cse', password: 'password123', branch: 'CSE' },
    { username: 'hod_ece', password: 'password123', branch: 'ECE' },
    { username: 'hod_eee', password: 'password123', branch: 'EEE' },
    { username: 'hod_mech', password: 'password123', branch: 'MECH' },
    { username: 'hod_civil', password: 'password123', branch: 'CIVIL' },
  ];

  for (let hod of hods) {
    const hashedPassword = await bcrypt.hash(hod.password, 10);
    hod.password = hashedPassword;
    await HOD.create(hod);
  }

  console.log('HODs inserted');
  mongoose.connection.close();
};

seedHODs().catch(err => console.log(err));
