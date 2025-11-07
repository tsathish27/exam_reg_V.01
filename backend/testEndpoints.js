const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

// Test function to verify endpoints
async function testEndpoints() {
  try {
    console.log('Testing API endpoints...\n');

    // Test admin login
    console.log('1. Testing admin login...');
    const loginResponse = await axios.post(`${BASE_URL}/admin/login`, {
      username: 'admin',
      password: 'password123'
    });
    
    if (loginResponse.data.success) {
      console.log('✅ Admin login successful');
      const token = loginResponse.data.token;
      
      // Test fetching students
      console.log('\n2. Testing fetch students...');
      try {
        const studentsResponse = await axios.get(`${BASE_URL}/admin/students`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('✅ Fetch students successful');
        console.log(`   Found ${studentsResponse.data.length} students`);
      } catch (error) {
        console.log('❌ Fetch students failed:', error.response?.data?.message || error.message);
      }

      // Test fetching subjects
      console.log('\n3. Testing fetch subjects...');
      try {
        const subjectsResponse = await axios.get(`${BASE_URL}/admin/subjects`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('✅ Fetch subjects successful');
        console.log(`   Found ${subjectsResponse.data.subjects?.length || subjectsResponse.data.length} subjects`);
      } catch (error) {
        console.log('❌ Fetch subjects failed:', error.response?.data?.message || error.message);
      }

      // Test adding a single student
      console.log('\n4. Testing add single student...');
      try {
        const addStudentResponse = await axios.post(`${BASE_URL}/admin/students`, {
          rollNumber: 'TEST001',
          name: 'Test Student',
          gender: 'Male',
          email: 'test@example.com',
          branch: 'CSE',
          year: '3',
          section: 'A',
          attendance: 80
        }, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('✅ Add student successful');
        console.log('   Student added:', addStudentResponse.data.message);
      } catch (error) {
        console.log('❌ Add student failed:', error.response?.data?.message || error.message);
      }

      // Test adding a single subject
      console.log('\n5. Testing add single subject...');
      try {
        const addSubjectResponse = await axios.post(`${BASE_URL}/admin/subjects`, {
          subjectCode: 'TEST101',
          subjectName: 'Test Subject',
          branch: 'CSE',
          year: '3-1',
          semester: '1',
          credits: 3
        }, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('✅ Add subject successful');
        console.log('   Subject added:', addSubjectResponse.data.message);
      } catch (error) {
        console.log('❌ Add subject failed:', error.response?.data?.message || error.message);
      }

    } else {
      console.log('❌ Admin login failed');
    }

  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

// Run the test
testEndpoints();