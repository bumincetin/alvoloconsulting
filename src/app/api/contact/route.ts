import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const runtime = 'edge';

const SUBJECT_MAX = 180;
const FIELD_MAX = 300;

/** Minimal HTML escaping for user-supplied strings interpolated into the email template. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Coerce an optional user field to a trimmed, length-capped string (or undefined). */
function optionalString(value: unknown, max = FIELD_MAX): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, max);
}

/** Subjects must be a single line — strip CR/LF so a crafted value cannot inject headers. */
function subjectLine(value: unknown): string | undefined {
  const s = optionalString(value, SUBJECT_MAX);
  return s ? s.replace(/[\r\n]+/g, ' ').trim() : undefined;
}

function row(label: string, value: string | undefined): string {
  if (!value) return '';
  return `<p style="margin: 10px 0;"><strong>${label}:</strong> ${escapeHtml(value)}</p>`;
}

export async function POST(request: Request) {
  const toEmail = process.env.CONTACT_EMAIL || 'alvoloconsulting@gmail.com';

  try {
    const body = await request.json();
    const { name, email, message, privacyConsent, marketingConsent } = body;

    // Optional intake fields (consultation brief)
    const kind = body?.kind === 'brief' ? 'brief' : 'contact';
    const phone = optionalString(body?.phone, 40);
    const company = optionalString(body?.company);
    const channel = optionalString(body?.channel, 20);
    const language = optionalString(body?.language, 10);
    const contactAs = optionalString(body?.contactAs, 20);
    const subject = subjectLine(body?.subject);

    // Log shape only; name, email and message are personal data and stay out of the logs.
    console.log('Contact intake:', { kind, messageLength: message?.length, hasPhone: !!phone, hasCompany: !!company, channel, language, contactAs });

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({
        error: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          message: !message ? 'Message is required' : null
        }
      }, { status: 400 });
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({
        error: 'Missing required fields',
        details: 'Name, email and message must be text'
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
      return NextResponse.json({
        error: 'Invalid email format',
        details: 'Please provide a valid email address'
      }, { status: 400 });
    }

    // Send email using Resend
    if (!resend) {
      return NextResponse.json({
        error: 'Email service not configured',
        details: 'Please configure RESEND_API_KEY in your environment variables. See the README for setup instructions.'
      }, { status: 500 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br>');
    const heading = kind === 'brief' ? 'New Consultation Brief' : 'New Contact Form Submission';
    const finalSubject = subject ?? (kind === 'brief' ? `New Consultation Brief from ${name}` : `New Contact Form Submission from ${name}`);

    try {
      const { error } = await resend.emails.send({
        from: 'Alvolo Consulting <onboarding@resend.dev>',
        to: [toEmail],
        replyTo: email,
        subject: finalSubject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a365d;">${heading}</h2>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${safeEmail}</p>
              ${row('Contacting as', contactAs)}
              ${row('Company', company)}
              ${row('Phone / WhatsApp', phone)}
              ${row('Preferred channel', channel)}
              ${row('Preferred language', language)}
              <p style="margin: 10px 0;"><strong>Privacy Consent:</strong> ${privacyConsent ? 'Yes' : 'No'}</p>
              <p style="margin: 10px 0;"><strong>Marketing Consent:</strong> ${marketingConsent ? 'Yes' : 'No'}</p>
              <p style="margin: 10px 0;"><strong>${kind === 'brief' ? 'Mandate brief' : 'Message'}:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; white-space: normal;">
                ${safeMessage}
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
