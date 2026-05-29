/**
 * Cloudflare Pages Function: /api/contact  (HARDENED)
 * Handles contact form submissions and sends email via Resend.
 *
 * Security audit remediation (2026-05-29 Wapiti assessment):
 *   F-5  — return 400 (not 500) on non-JSON / malformed bodies; guard request.json().
 *   F-6  — Origin allowlist so only the site's own pages can POST.
 *   F-7  — explicit 405 for non-POST methods (GET no longer falls through to homepage).
 *
 * Behavior preserved from the original: honeypot (`company_website`), required-field
 * validation, 5000-char message cap, 503 when env vars are missing, Resend relay.
 *
 * Pair this with a Cloudflare Rate Limiting rule on /api/contact (e.g. 5 req / 10 min / IP)
 * and, ideally, Cloudflare Turnstile for the strongest anti-abuse posture (F-6).
 */

const ALLOWED_ORIGINS = new Set([
  'https://dev.uyammadu.com',
  'https://uyammadu.com',
]);

const CONTACT_FALLBACK =
  'The form could not send right now. Please email chuk.uyammadu@gmail.com or call/text 254-258-7270.';

function json(body, status, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extraHeaders },
  });
}

// Basic, deliberately permissive email sanity check (not full RFC 5322).
function looksLikeEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // --- F-6: only accept cross-context posts from our own origin -------------
  // (Same-origin form fetches send an Origin header; reject anything else.)
  const origin = request.headers.get('Origin');
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return json({ ok: false, error: 'Forbidden origin.' }, 403);
  }

  // --- F-5: require JSON content type --------------------------------------
  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return json({ ok: false, error: 'Expected application/json request body.' }, 415);
  }

  // 1. Validate environment variables
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('Missing required environment variables for contact form.');
    return json({ ok: false, error: CONTACT_FALLBACK }, 503);
  }

  // --- F-5: parse JSON safely; malformed body => 400, never 500 ------------
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid JSON request body.' }, 400);
  }
  if (typeof body !== 'object' || body === null) {
    return json({ ok: false, error: 'Invalid request body.' }, 400);
  }

  // 2. Honeypot check (now reached for all parseable requests)
  if (body.company_website) {
    console.log('Honeypot triggered. Returning harmless success.');
    return json({ ok: true, message: 'Request sent. (Honeypot)' }, 200);
  }

  // 3. Required fields
  const requiredFields = ['name', 'email', 'category', 'message'];
  for (const field of requiredFields) {
    if (typeof body[field] !== 'string' || body[field].trim() === '') {
      return json({ ok: false, error: `Field "${field}" is required.` }, 400);
    }
  }

  // 3b. Email format sanity check (also protects the Resend reply_to field)
  if (!looksLikeEmail(body.email)) {
    return json({ ok: false, error: 'Please provide a valid email address.' }, 400);
  }

  // 4. Message length cap
  if (body.message.length > 5000) {
    return json({ ok: false, error: 'Message is too long (max 5000 characters).' }, 400);
  }

  try {
    // 5. Construct email content (plain text — no HTML injection surface)
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

    // 6. Send via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        subject: emailSubject,
        text: emailText,
        reply_to: body.email,
      }),
    });

    if (!resendResponse.ok) {
      const resendResult = await resendResponse.json().catch(() => ({}));
      console.error('Resend API error:', resendResult);
      throw new Error('Failed to send email via Resend.');
    }

    return json({ ok: true, message: 'Request sent. Chuk will be in touch soon.' }, 200);
  } catch (error) {
    console.error('Contact form error:', error);
    return json({ ok: false, error: CONTACT_FALLBACK }, 500);
  }
}

// --- F-7: explicit 405 for any non-POST method (GET no longer 200s) --------
export async function onRequest(context) {
  if (context.request.method === 'POST') {
    return onRequestPost(context);
  }
  return new Response(JSON.stringify({ ok: false, error: 'Method Not Allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST', 'Cache-Control': 'no-store' },
  });
}
