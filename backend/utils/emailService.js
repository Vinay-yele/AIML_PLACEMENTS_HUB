// backend/utils/emailService.js
import { createTransport } from 'nodemailer';
import { config } from 'dotenv';

// Ensure dotenv is loaded in this module
config();



// Validate required environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Missing required environment variables:');
    if (!process.env.EMAIL_USER) console.error('  - EMAIL_USER is missing');
    if (!process.env.EMAIL_PASS) console.error('  - EMAIL_PASS is missing');
    throw new Error('Email service cannot initialize without proper credentials');
}

// Create transporter with comprehensive configuration
const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    },
    // Add connection timeout and socket timeout
    connectionTimeout: 60000, // 60 seconds
    socketTimeout: 60000, // 60 seconds
    // Enable debugging for more detailed logs
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development'
});

// Verify connection on module load
let isConnectionVerified = false;

const verifyConnection = async () => {
    try {
        console.log('🔄 Verifying SMTP connection...');
        await transporter.verify();
        console.log('✅ SMTP connection verified successfully');
        isConnectionVerified = true;
        return true;
    } catch (error) {
        console.error('❌ SMTP connection verification failed:', error.message);
        console.error('Full error:', error);
        isConnectionVerified = false;
        return false;
    }
};

// Verify connection when module loads
verifyConnection();

/**
 * Send email with comprehensive error handling
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content (optional)
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
export async function sendEmail(to, subject, text, html) {
    try {
        console.log(`📧 Attempting to send email to: ${to}`);
        console.log(`📧 Subject: ${subject}`);
        
        // Double-check environment variables at runtime
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error('Environment variables not available at runtime');
        }

        // If connection wasn't verified, try to verify again
        if (!isConnectionVerified) {
            console.log('⚠️  Connection not verified, attempting to verify...');
            const verified = await verifyConnection();
            if (!verified) {
                throw new Error('SMTP connection could not be established');
            }
        }

        const mailOptions = {
            from: {
                name: 'Placement Coordinator',
                address: process.env.EMAIL_USER
            },
            to,
            subject,
            text,
            html: html || text // Fallback to text if no HTML provided
        };

        console.log('📤 Sending email with options:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
        });

        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email sent successfully!');
        console.log('📧 Message ID:', info.messageId);
        console.log('📧 Response:', info.response);
        
        return { 
            success: true, 
            messageId: info.messageId,
            response: info.response 
        };
        
    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        console.error('❌ Full error details:', error);
        
        // Provide more specific error messages
        let errorMessage = error.message;
        
        if (error.code === 'EAUTH') {
            errorMessage = 'Authentication failed. Please check your email credentials and app password.';
        } else if (error.code === 'ECONNECTION') {
            errorMessage = 'Failed to connect to email server. Please check your internet connection.';
        } else if (error.code === 'ETIMEDOUT') {
            errorMessage = 'Email sending timed out. Please try again.';
        }
        
        return { 
            success: false, 
            error: errorMessage,
            originalError: error.message 
        };
    }
}

/**
 * Test email service connection
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function testEmailConnection() {
    try {
        await transporter.verify();
        return { success: true };
    } catch (error) {
        return { 
            success: false, 
            error: error.message 
        };
    }
}

/**
 * Send a test email
 * @param {string} to - Test recipient
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
export async function sendTestEmail(to) {
    return await sendEmail(
        to,
        'Test Email from Placement Coordinator',
        'This is a test email to verify the email service is working correctly.',
        '<h2>Test Email</h2><p>This is a test email to verify the email service is working correctly.</p>'
    );
}

// Export transporter for advanced usage if needed
export { transporter };