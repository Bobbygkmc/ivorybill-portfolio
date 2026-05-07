/**
 * Cloudflare Pages Function: /api/contact
 * Handles contact form submissions and sends email via Resend.
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // 1. Validate Environment Variables
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env;

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('Missing required environment variables for contact form.');
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'The form could not send right now. Please email chuk.uyammadu@gmail.com or call/text 254-258-7270.',
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();

    // 2. Honeypot check
    // The field 'company_website' is hidden from users. If it's filled, it's likely a bot.
    if (body.company_website) {
      console.log('Honeypot triggered. Returning harmless success.');
      return new Response(
        JSON.stringify({ ok: true, message: 'Request sent. (Honeypot)' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Validate Required Fields
    const requiredFields = ['name', 'email', 'category', 'message'];
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        return new Response(
          JSON.stringify({ ok: false, error: `Field "${field}" is required.` }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // 4. Limit message length (e.g., 5000 chars)
    if (body.message.length > 5000) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Message is too long (max 5000 characters).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 5. Construct Email Content
    const emailSubject = `New Contact Form Submission: ${body.category} from ${body.name}`;
    const emailText = `
Name: ${body.name}
Email: ${body.email}
Business: ${body.business || 'N/A'}
Phone: ${body.phone || 'N/A'}
Location: ${body.location || 'N/A'}
Category: ${body.category}
Urgency: ${body.urgency || 'N/A'}
Preferred Contact: ${body.prefer || 'N/A'}

Message:
${body.message}
    `.trim();

    // 6. Send Email via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        subject: emailSubject,
        text: emailText,
        reply_to: body.email,
      }),
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend API error:', resendResult);
      throw new Error('Failed to send email via Resend.');
    }

    return new Response(
      JSON.stringify({ ok: true, message: 'Request sent. Chuk will be in touch soon.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'The form could not send right now. Please email chuk.uyammadu@gmail.com or call/text 254-258-7270.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
