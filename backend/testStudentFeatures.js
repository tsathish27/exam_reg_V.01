const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

// Test function to verify student features
async function testStudentFeatures() {
  try {
    console.log('Testing Student Features...\n');

    // Test admin login
    console.log('1. Testing admin login...');
    const loginResponse = await axios.post(`${BASE_URL}/admin/login`, {
      username: 'admin',
      password: 'password123'
    });
    
    if (loginResponse.data.success) {
      console.log('✅ Admin login successful');
      const token = loginResponse.data.token;
      
      // Test adding a single student
      console.log('\n2. Testing add single student...');
      try {
        const addStudentResponse = await axios.post(`${BASE_URL}/admin/students`, {
          rollNumber: 'TEST002',
          name: 'Test Student 2',
          gender: 'Female',
          email: 'test2@example.com',
          branch: 'ECE',
          year: '3',
          section: 'B',
          attendance: 85
        }, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('✅ Add student successful');
        console.log('   Student added:', addStudentResponse.data.message);
        
        const studentId = addStudentResponse.data.student._id;
        
        // Test updating student
        console.log('\n3. Testing update student...');
        try {
          const updateResponse = await axios.put(`${BASE_URL}/admin/students/${studentId}`, {
            name: 'Updated Test Student 2',
            attendance: 90
          }, {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log('✅ Update student successful');
          console.log('   Student updated:', updateResponse.data.message);
        } catch (error) {
          console.log('❌ Update student failed:', error.response?.data?.message || error.message);
        }

        // Test updating eligibility
        console.log('\n4. Testing update eligibility...');
        try {
          const eligibilityResponse = await axios.put(`${BASE_URL}/admin/students/${studentId}/eligibility`, 
            { eligible: false }, 
            {
              headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
          console.log('✅ Update eligibility successful');
          console.log('   Eligibility updated:', eligibilityResponse.data.message);
        } catch (error) {
          console.log('❌ Update eligibility failed:', error.response?.data?.message || error.message);
        }

        // Test fetching students
        console.log('\n5. Testing fetch students...');
        try {
          const studentsResponse = await axios.get(`${BASE_URL}/admin/students`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          console.log('✅ Fetch students successful');
          console.log(`   Found ${studentsResponse.data.length} students`);
          
          // Check if our test student is in the list
          const testStudent = studentsResponse.data.find(s => s.rollNumber === 'TEST002');
          if (testStudent) {
            console.log('   Test student found with examRegistered:', testStudent.examRegistered);
          }
        } catch (error) {
          console.log('❌ Fetch students failed:', error.response?.data?.message || error.message);
        }

        // Test student registration (simulate exam registration)
        console.log('\n6. Testing student registration...');
        try {
          const registerResponse = await axios.post(`${BASE_URL}/register`, {
            rollNumber: 'TEST002',
            name: 'Updated Test Student 2',
            gender: 'Female',
            email: 'test2@example.com',
            branch: 'ECE',
            year: '3',
            section: 'B',
            subjects: 'CS101,CS102,CS103'
          });
          console.log('✅ Student registration successful');
          console.log('   Registration:', registerResponse.data.message);
          
          // Check if student is now marked as registered
          const studentsAfterReg = await axios.get(`${BASE_URL}/admin/students`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const registeredStudent = studentsAfterReg.data.find(s => s.rollNumber === 'TEST002');
          if (registeredStudent && registeredStudent.examRegistered) {
            console.log('✅ Student is now marked as registered for exam');
          } else {
            console.log('❌ Student registration status not updated');
          }
        } catch (error) {
          console.log('❌ Student registration failed:', error.response?.data?.message || error.message);
        }

      } catch (error) {
        console.log('❌ Add student failed:', error.response?.data?.message || error.message);
      }

    } else {
      console.log('❌ Admin login failed');
    }

  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

// Run the test
testStudentFeatures();
