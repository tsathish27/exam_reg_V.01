# Exam Registration & Hall Ticket Generation System   -      ( developed for college purposes)

This project is a comprehensive solution for managing exam registrations and generating hall tickets for students. It includes three main dashboards: Admin, HOD, and Student. The system allows administrators to manage student data, HODs to approve students for exams, and students to download their hall tickets.

## Features

### Admin Dashboard
- **Login Authentication:** Admin can log in securely using predefined credentials.
- **Manage Students:** Add single or multiple students' details. Upload an Excel sheet to bulk insert student data.
- **Student Details:** Store and manage student details like roll number, name, gender, branch, year, eligibility, and approval status.

### HOD Dashboard
- **Login Authentication:** HODs can log in securely.
- **Student Approval:** HODs can approve students for exams based on their eligibility. Once approved, hall tickets are automatically generated and emailed to the students.

### Student Dashboard
- **Login Authentication:** Students can log in to check their exam eligibility status.
- **Download Hall Ticket:** Students can download their hall ticket once approved by the HOD.

## Technologies Used
- Backend: Node.js, Express, MongoDB
- Frontend: React.js, Axios, PDF-Lib
- Email: Nodemailer


