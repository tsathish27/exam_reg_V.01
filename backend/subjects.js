// subjects.js

const subjectsData = {
  'CSE': {
    '3-1': ['20CSE211DS Data Structures', '20CSE212ALG Algorithms', '20CSE213OS Operating Systems', '20CSE214DB Database Systems', '20CSE215CN Computer Networks', '20CSE216SE Software Engineering', '20CSE217WT Web Technologies'],
    '3-2': ['20CSE221CO Computer Organization', '20CSE222MP Microprocessors', '20CSE223OOP Object Oriented Programming', '20CSE224CD Compiler Design', '20CSE225CG Computer Graphics', '20CSE226AI Artificial Intelligence', '20CSE227BDA Big Data Analytics'],
    '4-1': ['20CSE231ML Machine Learning', '20CSE232AI Artificial Intelligence', '20CSE233BD Big Data', '20CSE234CC Cloud Computing', '20CSE235CS Cyber Security', '20CSE236BT Blockchain Technology', '20CSE237IoT IoT'],
    '4-2': ['20CSE241ML2 Machine Learning2', '20CSE242AI Artificial Intelligence', '20CSE243BD Big Data', '20CSE244CC Cloud Computing', '20CSE245CS Cyber Security', '20CSE246BT Blockchain Technology', '20CSE247IoT IoT'],
  },
  'MECH': {
    '3-1': ['20MECH311T Thermodynamics', '20MECH312FM Fluid Mechanics', '20MECH313HT Heat Transfer', '20MECH314DM Dynamics of Machinery', '20MECH315SM Strength of Materials', '20MECH316MP Manufacturing Processes', '20MECH317MS Material Science'],
    '3-2': ['20MECH321MD Machine Design', '20MECH322RAC Refrigeration and Air Conditioning', '20MECH323AE Automobile Engineering', '20MECH324ROB Robotics', '20MECH325CAD CAD/CAM', '20MECH326IE Industrial Engineering', '20MECH327VE Vibration Engineering'],
    '4': ['20MECH41RAC Refrigeration and Air Conditioning', '20MECH42AE Automobile Engineering', '20MECH43ROB Robotics', '20MECH44CAD CAD/CAM', '20MECH45IE Industrial Engineering', '20MECH46VE Vibration Engineering', '20MECH47PPE Power Plant Engineering'],
  },
  // Add other branches and years as needed
  'ECE': {
    '3-1': ['20ECE311EC Electronic Circuits', '20ECE312CS Communication Systems', '20ECE313DSP Digital Signal Processing', '20ECE314EM Electromagnetic Theory', '20ECE315MI Microelectronics', '20ECE316VLSI VLSI Design', '20ECE317AC Analog Circuits'],
    '3-2': ['20ECE321DC Digital Communication', '20ECE322MC Microcontrollers', '20ECE323ES Embedded Systems', '20ECE324WC Wireless Communication', '20ECE325SP Signal Processing', '20ECE326IC Integrated Circuits', '20ECE327PE Power Electronics'],
    '4-1': ['20ECE331OC Optical Communication', '20ECE332RF RF Engineering', '20ECE333AI Artificial Intelligence', '20ECE334ML Machine Learning', '20ECE335IoT Internet of Things', '20ECE336NS Network Security', '20ECE337DSP2 Advanced DSP'],
    '4-2': ['20ECE341OC2 Optical Communication2', '20ECE342RF2 RF Engineering2', '20ECE343AI2 Artificial Intelligence2', '20ECE344ML2 Machine Learning2', '20ECE345IoT2 Internet of Things2', '20ECE346NS2 Network Security2', '20ECE347DSP3 Advanced DSP3'],
  },
  'EEE': {
    '3-1': ['20EEE311EM Electrical Machines', '20EEE312PS Power Systems', '20EEE313EMI Electromagnetic Interference', '20EEE314ED Electrical Drives', '20EEE315PE Power Electronics', '20EEE316ME Measurements', '20EEE317DCS Digital Control Systems'],
    '3-2': ['20EEE321PS2 Power Systems2', '20EEE322EM2 Electrical Machines2', '20EEE323ED2 Electrical Drives2', '20EEE324PE2 Power Electronics2', '20EEE325ME2 Measurements2', '20EEE326DCS2 Digital Control Systems2', '20EEE327ES Electrical Safety'],
    '4-1': ['20EEE331PS3 Power Systems3', '20EEE332EM3 Electrical Machines3', '20EEE333ED3 Electrical Drives3', '20EEE334PE3 Power Electronics3', '20EEE335ME3 Measurements3', '20EEE336DCS3 Digital Control Systems3', '20EEE337ES2 Electrical Safety2'],
    '4-2': ['20EEE341PS4 Power Systems4', '20EEE342EM4 Electrical Machines4', '20EEE343ED4 Electrical Drives4', '20EEE344PE4 Power Electronics4', '20EEE345ME4 Measurements4', '20EEE346DCS4 Digital Control Systems4', '20EEE347ES3 Electrical Safety3'],
  },
  'CIVIL': {
    '3-1': ['20CIV311SM Strength of Materials', '20CIV312FM Fluid Mechanics', '20CIV313CT Concrete Technology', '20CIV314GE Geotechnical Engineering', '20CIV315SS Structural Stability', '20CIV316ST Structural Analysis', '20CIV317WP Water Resources Planning'],
    '3-2': ['20CIV321FE Foundation Engineering', '20CIV322PE Prestressed Concrete', '20CIV323TE Transportation Engineering', '20CIV324SE Structural Engineering', '20CIV325EE Environmental Engineering', '20CIV326HE Hydraulic Engineering', '20CIV327GE2 Geotechnical Engineering2'],
    '4-1': ['20CIV331FE2 Foundation Engineering2', '20CIV332PE2 Prestressed Concrete2', '20CIV333TE2 Transportation Engineering2', '20CIV334SE2 Structural Engineering2', '20CIV335EE2 Environmental Engineering2', '20CIV336HE2 Hydraulic Engineering2', '20CIV337GE3 Geotechnical Engineering3'],
    '4-2': ['20CIV341FE3 Foundation Engineering3', '20CIV342PE3 Prestressed Concrete3', '20CIV343TE3 Transportation Engineering3', '20CIV344SE3 Structural Engineering3', '20CIV345EE3 Environmental Engineering3', '20CIV346HE3 Hydraulic Engineering3', '20CIV347GE4 Geotechnical Engineering4'],
  },
  'CSD':{
    '3-1': ['20CSD311DS Data Structures', '20CSD312ALG Algorithms', '20CSD313OS Operating Systems', '20CSD314DB Database Systems', '20CSD315CN Computer Networks', '20CSD316SE Software Engineering', '20CSD317WT Web Technologies'],
    '3-2': ['20CSD321CO Computer Organization', '20CSD322MP Microprocessors', '20CSD323OOP Object Oriented Programming', '20CSD324CD Compiler Design', '20CSD325CG Computer Graphics', '20CSD326AI Artificial Intelligence', '20CSD327BDA Big Data Analytics'],
    '4-1': ['20CSD331ML Machine Learning', '20CSD332AI Artificial Intelligence', '20CSD333BD Big Data', '20CSD334CC Cloud Computing', '20CSD335CS Cyber Security', '20CSD336BT Blockchain Technology', '20CSD337IoT IoT'],
    '4-2': ['20CSD341ML2 Machine Learning2', '20CSD342AI Artificial Intelligence', '20CSD343BD Big Data', '20CSD344CC Cloud Computing', '20CSD345CS Cyber Security', '20CSD346BT Blockchain Technology', '20CSD347IoT IoT'],
  }


  };
  
  function getSubjects(branch, year) {
    return subjectsData[branch] ? subjectsData[branch][year] || [] : [];
  }
  
  module.exports = getSubjects;
  