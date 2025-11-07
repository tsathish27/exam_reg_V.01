const mongoose = require('mongoose');
const Subject = require('./models/Subject');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/examreg')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Subject data from the hardcoded subjects.js
const subjectsData = [
  // CSE Subjects
  { subjectCode: '20CSE211DS', subjectName: 'Data Structures', branch: 'CSE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CSE212ALG', subjectName: 'Algorithms', branch: 'CSE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CSE213OS', subjectName: 'Operating Systems', branch: 'CSE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CSE214DB', subjectName: 'Database Systems', branch: 'CSE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CSE215CN', subjectName: 'Computer Networks', branch: 'CSE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CSE216SE', subjectName: 'Software Engineering', branch: 'CSE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CSE217WT', subjectName: 'Web Technologies', branch: 'CSE', year: '3-1', semester: '1', credits: 3 },
  
  { subjectCode: '20CSE221CO', subjectName: 'Computer Organization', branch: 'CSE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CSE222MP', subjectName: 'Microprocessors', branch: 'CSE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CSE223OOP', subjectName: 'Object Oriented Programming', branch: 'CSE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CSE224CD', subjectName: 'Compiler Design', branch: 'CSE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CSE225CG', subjectName: 'Computer Graphics', branch: 'CSE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CSE226AI', subjectName: 'Artificial Intelligence', branch: 'CSE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CSE227BDA', subjectName: 'Big Data Analytics', branch: 'CSE', year: '3-2', semester: '2', credits: 3 },

  { subjectCode: '20CSE231ML', subjectName: 'Machine Learning', branch: 'CSE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CSE232AI', subjectName: 'Artificial Intelligence', branch: 'CSE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CSE233BD', subjectName: 'Big Data', branch: 'CSE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CSE234CC', subjectName: 'Cloud Computing', branch: 'CSE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CSE235CS', subjectName: 'Cyber Security', branch: 'CSE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CSE236BT', subjectName: 'Blockchain Technology', branch: 'CSE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CSE237IoT', subjectName: 'IoT', branch: 'CSE', year: '4-1', semester: '1', credits: 3 },

  { subjectCode: '20CSE241ML2', subjectName: 'Machine Learning2', branch: 'CSE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CSE242AI2', subjectName: 'Artificial Intelligence2', branch: 'CSE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CSE243BD2', subjectName: 'Big Data2', branch: 'CSE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CSE244CC2', subjectName: 'Cloud Computing2', branch: 'CSE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CSE245CS2', subjectName: 'Cyber Security2', branch: 'CSE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CSE246BT2', subjectName: 'Blockchain Technology2', branch: 'CSE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CSE247IoT2', subjectName: 'IoT2', branch: 'CSE', year: '4-2', semester: '2', credits: 3 },

  // ECE Subjects
  { subjectCode: '20ECE311EC', subjectName: 'Electronic Circuits', branch: 'ECE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20ECE312CS', subjectName: 'Communication Systems', branch: 'ECE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20ECE313DSP', subjectName: 'Digital Signal Processing', branch: 'ECE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20ECE314EM', subjectName: 'Electromagnetic Theory', branch: 'ECE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20ECE315MI', subjectName: 'Microelectronics', branch: 'ECE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20ECE316VLSI', subjectName: 'VLSI Design', branch: 'ECE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20ECE317AC', subjectName: 'Analog Circuits', branch: 'ECE', year: '3-1', semester: '1', credits: 3 },

  { subjectCode: '20ECE321DC', subjectName: 'Digital Communication', branch: 'ECE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20ECE322MC', subjectName: 'Microcontrollers', branch: 'ECE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20ECE323ES', subjectName: 'Embedded Systems', branch: 'ECE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20ECE324WC', subjectName: 'Wireless Communication', branch: 'ECE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20ECE325SP', subjectName: 'Signal Processing', branch: 'ECE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20ECE326IC', subjectName: 'Integrated Circuits', branch: 'ECE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20ECE327PE', subjectName: 'Power Electronics', branch: 'ECE', year: '3-2', semester: '2', credits: 3 },

  { subjectCode: '20ECE331OC', subjectName: 'Optical Communication', branch: 'ECE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20ECE332RF', subjectName: 'RF Engineering', branch: 'ECE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20ECE333AI', subjectName: 'Artificial Intelligence', branch: 'ECE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20ECE334ML', subjectName: 'Machine Learning', branch: 'ECE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20ECE335IoT', subjectName: 'Internet of Things', branch: 'ECE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20ECE336NS', subjectName: 'Network Security', branch: 'ECE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20ECE337DSP2', subjectName: 'Advanced DSP', branch: 'ECE', year: '4-1', semester: '1', credits: 3 },

  { subjectCode: '20ECE341OC2', subjectName: 'Optical Communication2', branch: 'ECE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20ECE342RF2', subjectName: 'RF Engineering2', branch: 'ECE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20ECE343AI2', subjectName: 'Artificial Intelligence2', branch: 'ECE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20ECE344ML2', subjectName: 'Machine Learning2', branch: 'ECE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20ECE345IoT2', subjectName: 'Internet of Things2', branch: 'ECE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20ECE346NS2', subjectName: 'Network Security2', branch: 'ECE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20ECE347DSP3', subjectName: 'Advanced DSP3', branch: 'ECE', year: '4-2', semester: '2', credits: 3 },

  // MECH Subjects
  { subjectCode: '20MECH311T', subjectName: 'Thermodynamics', branch: 'MECH', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20MECH312FM', subjectName: 'Fluid Mechanics', branch: 'MECH', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20MECH313HT', subjectName: 'Heat Transfer', branch: 'MECH', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20MECH314DM', subjectName: 'Dynamics of Machinery', branch: 'MECH', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20MECH315SM', subjectName: 'Strength of Materials', branch: 'MECH', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20MECH316MP', subjectName: 'Manufacturing Processes', branch: 'MECH', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20MECH317MS', subjectName: 'Material Science', branch: 'MECH', year: '3-1', semester: '1', credits: 3 },

  { subjectCode: '20MECH321MD', subjectName: 'Machine Design', branch: 'MECH', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20MECH322RAC', subjectName: 'Refrigeration and Air Conditioning', branch: 'MECH', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20MECH323AE', subjectName: 'Automobile Engineering', branch: 'MECH', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20MECH324ROB', subjectName: 'Robotics', branch: 'MECH', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20MECH325CAD', subjectName: 'CAD/CAM', branch: 'MECH', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20MECH326IE', subjectName: 'Industrial Engineering', branch: 'MECH', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20MECH327VE', subjectName: 'Vibration Engineering', branch: 'MECH', year: '3-2', semester: '2', credits: 3 },

  { subjectCode: '20MECH41RAC', subjectName: 'Refrigeration and Air Conditioning', branch: 'MECH', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20MECH42AE', subjectName: 'Automobile Engineering', branch: 'MECH', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20MECH43ROB', subjectName: 'Robotics', branch: 'MECH', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20MECH44CAD', subjectName: 'CAD/CAM', branch: 'MECH', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20MECH45IE', subjectName: 'Industrial Engineering', branch: 'MECH', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20MECH46VE', subjectName: 'Vibration Engineering', branch: 'MECH', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20MECH47PPE', subjectName: 'Power Plant Engineering', branch: 'MECH', year: '4-1', semester: '1', credits: 3 },

  // EEE Subjects
  { subjectCode: '20EEE311EM', subjectName: 'Electrical Machines', branch: 'EEE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20EEE312PS', subjectName: 'Power Systems', branch: 'EEE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20EEE313EMI', subjectName: 'Electromagnetic Interference', branch: 'EEE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20EEE314ED', subjectName: 'Electrical Drives', branch: 'EEE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20EEE315PE', subjectName: 'Power Electronics', branch: 'EEE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20EEE316ME', subjectName: 'Measurements', branch: 'EEE', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20EEE317DCS', subjectName: 'Digital Control Systems', branch: 'EEE', year: '3-1', semester: '1', credits: 3 },

  { subjectCode: '20EEE321PS2', subjectName: 'Power Systems2', branch: 'EEE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20EEE322EM2', subjectName: 'Electrical Machines2', branch: 'EEE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20EEE323ED2', subjectName: 'Electrical Drives2', branch: 'EEE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20EEE324PE2', subjectName: 'Power Electronics2', branch: 'EEE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20EEE325ME2', subjectName: 'Measurements2', branch: 'EEE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20EEE326DCS2', subjectName: 'Digital Control Systems2', branch: 'EEE', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20EEE327ES', subjectName: 'Electrical Safety', branch: 'EEE', year: '3-2', semester: '2', credits: 3 },

  { subjectCode: '20EEE331PS3', subjectName: 'Power Systems3', branch: 'EEE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20EEE332EM3', subjectName: 'Electrical Machines3', branch: 'EEE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20EEE333ED3', subjectName: 'Electrical Drives3', branch: 'EEE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20EEE334PE3', subjectName: 'Power Electronics3', branch: 'EEE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20EEE335ME3', subjectName: 'Measurements3', branch: 'EEE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20EEE336DCS3', subjectName: 'Digital Control Systems3', branch: 'EEE', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20EEE337ES2', subjectName: 'Electrical Safety2', branch: 'EEE', year: '4-1', semester: '1', credits: 3 },

  { subjectCode: '20EEE341PS4', subjectName: 'Power Systems4', branch: 'EEE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20EEE342EM4', subjectName: 'Electrical Machines4', branch: 'EEE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20EEE343ED4', subjectName: 'Electrical Drives4', branch: 'EEE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20EEE344PE4', subjectName: 'Power Electronics4', branch: 'EEE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20EEE345ME4', subjectName: 'Measurements4', branch: 'EEE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20EEE346DCS4', subjectName: 'Digital Control Systems4', branch: 'EEE', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20EEE347ES3', subjectName: 'Electrical Safety3', branch: 'EEE', year: '4-2', semester: '2', credits: 3 },

  // CIVIL Subjects
  { subjectCode: '20CIV311SM', subjectName: 'Strength of Materials', branch: 'CIVIL', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CIV312FM', subjectName: 'Fluid Mechanics', branch: 'CIVIL', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CIV313CT', subjectName: 'Concrete Technology', branch: 'CIVIL', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CIV314GE', subjectName: 'Geotechnical Engineering', branch: 'CIVIL', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CIV315SS', subjectName: 'Structural Stability', branch: 'CIVIL', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CIV316ST', subjectName: 'Structural Analysis', branch: 'CIVIL', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CIV317WP', subjectName: 'Water Resources Planning', branch: 'CIVIL', year: '3-1', semester: '1', credits: 3 },

  { subjectCode: '20CIV321FE', subjectName: 'Foundation Engineering', branch: 'CIVIL', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CIV322PE', subjectName: 'Prestressed Concrete', branch: 'CIVIL', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CIV323TE', subjectName: 'Transportation Engineering', branch: 'CIVIL', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CIV324SE', subjectName: 'Structural Engineering', branch: 'CIVIL', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CIV325EE', subjectName: 'Environmental Engineering', branch: 'CIVIL', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CIV326HE', subjectName: 'Hydraulic Engineering', branch: 'CIVIL', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CIV327GE2', subjectName: 'Geotechnical Engineering2', branch: 'CIVIL', year: '3-2', semester: '2', credits: 3 },

  { subjectCode: '20CIV331FE2', subjectName: 'Foundation Engineering2', branch: 'CIVIL', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CIV332PE2', subjectName: 'Prestressed Concrete2', branch: 'CIVIL', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CIV333TE2', subjectName: 'Transportation Engineering2', branch: 'CIVIL', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CIV334SE2', subjectName: 'Structural Engineering2', branch: 'CIVIL', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CIV335EE2', subjectName: 'Environmental Engineering2', branch: 'CIVIL', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CIV336HE2', subjectName: 'Hydraulic Engineering2', branch: 'CIVIL', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CIV337GE3', subjectName: 'Geotechnical Engineering3', branch: 'CIVIL', year: '4-1', semester: '1', credits: 3 },

  { subjectCode: '20CIV341FE3', subjectName: 'Foundation Engineering3', branch: 'CIVIL', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CIV342PE3', subjectName: 'Prestressed Concrete3', branch: 'CIVIL', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CIV343TE3', subjectName: 'Transportation Engineering3', branch: 'CIVIL', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CIV344SE3', subjectName: 'Structural Engineering3', branch: 'CIVIL', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CIV345EE3', subjectName: 'Environmental Engineering3', branch: 'CIVIL', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CIV346HE3', subjectName: 'Hydraulic Engineering3', branch: 'CIVIL', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CIV347GE4', subjectName: 'Geotechnical Engineering4', branch: 'CIVIL', year: '4-2', semester: '2', credits: 3 },

  // CSD Subjects
  { subjectCode: '20CSD311DS', subjectName: 'Data Structures', branch: 'CSD', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CSD312ALG', subjectName: 'Algorithms', branch: 'CSD', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CSD313OS', subjectName: 'Operating Systems', branch: 'CSD', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CSD314DB', subjectName: 'Database Systems', branch: 'CSD', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CSD315CN', subjectName: 'Computer Networks', branch: 'CSD', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CSD316SE', subjectName: 'Software Engineering', branch: 'CSD', year: '3-1', semester: '1', credits: 3 },
  { subjectCode: '20CSD317WT', subjectName: 'Web Technologies', branch: 'CSD', year: '3-1', semester: '1', credits: 3 },

  { subjectCode: '20CSD321CO', subjectName: 'Computer Organization', branch: 'CSD', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CSD322MP', subjectName: 'Microprocessors', branch: 'CSD', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CSD323OOP', subjectName: 'Object Oriented Programming', branch: 'CSD', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CSD324CD', subjectName: 'Compiler Design', branch: 'CSD', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CSD325CG', subjectName: 'Computer Graphics', branch: 'CSD', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CSD326AI', subjectName: 'Artificial Intelligence', branch: 'CSD', year: '3-2', semester: '2', credits: 3 },
  { subjectCode: '20CSD327BDA', subjectName: 'Big Data Analytics', branch: 'CSD', year: '3-2', semester: '2', credits: 3 },

  { subjectCode: '20CSD331ML', subjectName: 'Machine Learning', branch: 'CSD', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CSD332AI', subjectName: 'Artificial Intelligence', branch: 'CSD', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CSD333BD', subjectName: 'Big Data', branch: 'CSD', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CSD334CC', subjectName: 'Cloud Computing', branch: 'CSD', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CSD335CS', subjectName: 'Cyber Security', branch: 'CSD', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CSD336BT', subjectName: 'Blockchain Technology', branch: 'CSD', year: '4-1', semester: '1', credits: 3 },
  { subjectCode: '20CSD337IoT', subjectName: 'IoT', branch: 'CSD', year: '4-1', semester: '1', credits: 3 },

  { subjectCode: '20CSD341ML2', subjectName: 'Machine Learning2', branch: 'CSD', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CSD342AI2', subjectName: 'Artificial Intelligence2', branch: 'CSD', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CSD343BD2', subjectName: 'Big Data2', branch: 'CSD', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CSD344CC2', subjectName: 'Cloud Computing2', branch: 'CSD', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CSD345CS2', subjectName: 'Cyber Security2', branch: 'CSD', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CSD346BT2', subjectName: 'Blockchain Technology2', branch: 'CSD', year: '4-2', semester: '2', credits: 3 },
  { subjectCode: '20CSD347IoT2', subjectName: 'IoT2', branch: 'CSD', year: '4-2', semester: '2', credits: 3 }
];

// Seed subjects
const seedSubjects = async () => {
  try {
    // Clear existing subjects
    await Subject.deleteMany({});
    console.log('Cleared existing subjects');

    // Insert new subjects
    const result = await Subject.insertMany(subjectsData);
    console.log(`Successfully seeded ${result.length} subjects`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding subjects:', error);
    mongoose.connection.close();
  }
};

seedSubjects();