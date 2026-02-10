import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const runtime = 'edge';

export async function POST(request: Request) {
  const toEmail = process.env.CONTACT_EMAIL || 'alvoloconsulting@gmail.com';

  try {
    console.log('Starting contact form submission...');

    const body = await request.json();
    const { name, email, message, privacyConsent, marketingConsent } = body;

    console.log('Received form data:', {
      name,
      email,
      messageLength: message?.length,
      privacyConsent,
      marketingConsent
    });

    // Basic validation
    if (!name || !email || !message) {
      console.log('Validation failed:', { name: !!name, email: !!email, message: !!message });
      return NextResponse.json({
        error: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          message: !message ? 'Message is required' : null
        }
      }, { status: 400 });
    }

    // Check if privacy consent is given
    if (!privacyConsent) {
      return NextResponse.json({
        error: 'Privacy consent required',
        details: 'You must accept the privacy policy to submit this form.'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return NextResponse.json({
        error: 'Invalid email format',
        details: 'Please provide a valid email address'
      }, { status: 400 });
    }

    console.log('Attempting to send email...');

    // Send email using Resend
    if (!resend) {
      return NextResponse.json({
        error: 'Email service not configured',
        details: 'Please configure RESEND_API_KEY in your environment variables. See the README for setup instructions.'
      }, { status: 500 });
    }

    try {
      const { error } = await resend.emails.send({
        from: 'Alvolo Consulting <onboarding@resend.dev>',
        to: [toEmail],
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a365d;">New Contact Form Submission</h2>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Privacy Consent:</strong> ${privacyConsent ? 'Yes' : 'No'}</p>
              <p style="margin: 10px 0;"><strong>Marketing Consent:</strong> ${marketingConsent ? 'Yes' : 'No'}</p>
              <p style="margin: 10px 0;"><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        return NextResponse.json({
          error: 'Failed to send email',
          details: error.message
        }, { status: 500 });
      }

      console.log('Email sent successfully via Resend');
      return NextResponse.json({
        message: 'Email sent successfully',
        details: 'Your message has been delivered'
      }, { status: 200 });

    } catch (resendError) {
      console.error('Resend error:', resendError);
      return NextResponse.json({
        error: 'Failed to send email',
        details: resendError instanceof Error ? resendError.message : 'Unknown error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'An unexpected error occurred'
    }, { status: 500 });
  }
} 