const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const nodemailer = require('nodemailer');
const { image } = require('pdfkit');

// Ensure environment variables are loaded
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const generateHallTicket = async (registration) => {
  try {

    if (!registration.approved) {
      console.log(`Hall ticket not generated for ${registration.rollNumber}: Not approved by HOD`);
      return 'Hall ticket not generated: Not approved by HOD';
    }

    console.log('Starting PDF generation');
    console.log('Registration object:', registration);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Resolve paths
    const logoPath = path.resolve(__dirname, 'assets', 'clg_logo.png');
    const signaturePath = path.resolve(__dirname, 'assets', 'sttlogo1.png');
    const photoPath =  registration.image ? path.resolve(__dirname, 'uploads', registration.image) : null;

    console.log('Logo Path:', logoPath);
    console.log('Signature Path:', signaturePath);
    console.log('Photo Path:', photoPath);

    // Verify if files exist
    if (!fs.existsSync(logoPath)) {
      throw new Error(`Logo file not found at path: ${logoPath}`);
    }
    if (!fs.existsSync(signaturePath)) {
      throw new Error(`Signature file not found at path: ${signaturePath}`);
    }
    if (photoPath && !fs.existsSync(photoPath)) {
      throw new Error(`Student photo file not found at path: ${photoPath}`);
    }

    // Add College Logo
    const logoImageBytes = fs.readFileSync(logoPath);
    const logoImage = await pdfDoc.embedPng(logoImageBytes);
    page.drawImage(logoImage, { x: 25, y: height - 120, width: 100, height: 100 });

    // Add Student Photo
    if (photoPath) {
      const photoImageBytes = fs.readFileSync(photoPath);
      const photoImage = await pdfDoc.embedJpg(photoImageBytes); // Assuming photo is in JPG format
      page.drawRectangle({ x: 450, y: height - 290, width: 100, height: 100, borderColor: rgb(0, 0, 0), borderWidth: 1 }); // Add border
      page.drawImage(photoImage, { x: 450, y: height - 290, width: 100, height: 100 }); // Adjust position and size as needed
    }

    // Add College Details
    page.drawText('MADANAPALLE INSTITUTE OF TECHNOLOGY & SCIENCE', { x: 140, y: height - 50, size: 14, font: boldFont, color: rgb(0, 0, 0) });
    page.drawText('(UGC – AUTONOMOUS INSTITUTION)', { x: 200, y: height - 70, size: 12, font: font, color: rgb(0, 0, 0) });
    page.drawText('MADANAPALLE – 517325 (A.P)', { x: 220, y: height - 90, size: 12, font: font, color: rgb(0, 0, 0) });
    page.drawText('(Affiliated to JNTUA, Ananthapuramu & Approved by AICTE, New Delhi)', { x: 130, y: height - 110, size: 10, font: font, color: rgb(0, 0, 0) });

    // Add Examination Details
    page.drawText(`Examination For - B.Tech – ${registration.year} R20 Academic Regulations`, { x: 50, y: height - 160, size: 12, font: boldFont, color: rgb(0, 0, 0) });
    page.drawText(`The Candidate is appearing for Regular Examinations, Month & Year of Examination:`, { x: 50, y: height - 180, size: 12, font: font, color: rgb(0, 0, 0) });
    page.drawText(`H.T. No: ${registration.rollNumber}`, { x: 50, y: height - 200, size: 12, font:boldFont, color: rgb(0, 0, 0) });
    page.drawText(`Name: ${registration.name}`, { x: 50, y: height - 220, size: 12, font: font, color: rgb(0, 0, 0) });
    page.drawText(`Gender: ${registration.gender}`, { x: 50, y: height - 240, size: 12, font: font, color: rgb(0, 0, 0) });
    page.drawText(`Branch: ${registration.branch}`, { x: 50, y: height - 260, size: 12, font: font, color: rgb(0, 0, 0) });
    page.drawText(`Section: ${registration.section}`, { x: 50, y: height - 280, size: 12, font: font, color: rgb(0, 0, 0) });

    // Add Subjects with a table
    const tableTopY = height - 320;
    const cellHeight = 20;
    const cellPadding = 5;
    let yPosition = tableTopY;

    registration.subjects.forEach((subject, index) => {
      page.drawRectangle({
        x: 50,
        y: yPosition - cellHeight,
        width: width - 100,
        height: cellHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1
      });

      page.drawText(`${index + 1}. ${subject}`, { x: 55, y: yPosition - cellHeight + cellPadding, size: 10, font: font, color: rgb(0, 0, 0) });
      yPosition -= cellHeight;
    });

    // Add Signature
    const signatureImageBytes = fs.readFileSync(signaturePath);
    const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
    page.drawImage(signatureImage, { x: 400, y: 155, width: 100, height: 50 });

    page.drawText('Signature of the Candidate', { x: 50, y:150, size: 12, font: font, color: rgb(0, 0, 0) });
    page.drawText('Controller of Examinations', { x: 400, y: 150, size: 12, font: font, color: rgb(0, 0, 0) });

    // Add Instructions
    const instructions = [
      'Instructions to Candidates:',
      '1. Display his/her ID card for verification.',
      '2. The candidate has to confirm himself/herself that he/she does not possess any foreign material,electronic gadgets',
      'other than electronic calculator.',
      '3. Candidates should stay in the examination hall at least half-an-hour from the commencement of the examination.',
      '4. Be present in the examination hall 15 minutes before the time of commencement of examination.',
      ' No candidate will be allowed','after the commencement of the examination.'
    ];

    instructions.forEach((line, index) => {
      page.drawText(line, { x: 50, y:125 - (index * 20), size: 10, font: font, color: rgb(0, 0, 0) });
    });

    // Save the PDF to a file
    const pdfBytes = await pdfDoc.save();

    // Ensure the output directory exists
    const outputDir = path.join(__dirname, 'halltickets');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Define output path
    const outputPath = path.join(outputDir, `Hall_Ticket_${registration.rollNumber}.pdf`);

    // Write the PDF file
    fs.writeFileSync(outputPath, pdfBytes);
    console.log(`PDF generated at path: ${outputPath}`);

    // Log environment variables for debugging
    console.log('GMAIL_USER:', process.env.GMAIL_USER);
    console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '****' : 'Not set');

    // Send the PDF as an email attachment
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: registration.email, // Assuming registration has an email field
      subject: 'Your Hall Ticket',
      text: 'Please find attached your hall ticket.',
      attachments: [
        {
          filename: `Hall_Ticket_${registration.rollNumber}.pdf`,
          path: outputPath
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    return outputPath; // Return path of the generated PDF
  } catch (error) {
    console.error('Error during PDF generation:', error);
    throw error;
  }
};

module.exports = generateHallTicket;
