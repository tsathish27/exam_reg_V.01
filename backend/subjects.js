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
  };
  
  function getSubjects(branch, year) {
    return subjectsData[branch] ? subjectsData[branch][year] || [] : [];
  }
  
  module.exports = getSubjects;
  