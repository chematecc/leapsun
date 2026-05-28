import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  let body: { name: string; email: string; company?: string; message: string; locale: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, company, message, locale } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // 1. Save to Supabase
  const supabase = createClient();
  const { error: dbError } = await supabase.from('contacts').insert({
    name,
    email,
    company: company || null,
    message,
    locale,
  });

  if (dbError) {
    console.error('Supabase insert error:', dbError);
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
  }

  // 2. Send email notification (non-blocking — form still succeeds if email fails)
  if (process.env.RESEND_API_KEY) {
    try {
      const fromAddress = process.env.RESEND_FROM_EMAIL ?? 'Leapsun Website <onboarding@resend.dev>';
      await resend.emails.send({
        from: fromAddress,
        to: ['ask@leapsunpartners.com'],
        replyTo: email,
        subject: `New enquiry from ${name}${company ? ` · ${company}` : ''}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1A2635;max-width:600px;margin:0 auto;padding:32px 24px;">
  <div style="border-top:3px solid #D4AF37;padding-top:24px;margin-bottom:32px;">
    <h1 style="font-size:22px;font-weight:300;letter-spacing:-0.02em;margin:0 0 4px;">New Enquiry</h1>
    <p style="color:#8A96A3;font-size:12px;margin:0;text-transform:uppercase;letter-spacing:0.1em;">Leapsun Partners · Website Contact Form</p>
  </div>

  <table style="width:100%;border-collapse:collapse;">
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:100px;vertical-align:top;">
        <span style="font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#8A96A3;">Name</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;">${name}</td>
    </tr>
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
        <span style="font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#8A96A3;">Email</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
        <a href="mailto:${email}" style="color:#D4AF37;text-decoration:none;font-size:15px;">${email}</a>
      </td>
    </tr>
    ${company ? `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;vertical-align:top;">
        <span style="font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#8A96A3;">Company</span>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;">${company}</td>
    </tr>` : ''}
    <tr>
      <td style="padding:10px 0;vertical-align:top;padding-top:16px;">
        <span style="font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#8A96A3;">Message</span>
      </td>
      <td style="padding:10px 0;padding-top:16px;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
    </tr>
  </table>

  <div style="margin-top:32px;padding-top:20px;border-top:1px solid #f0f0f0;font-size:11px;color:#8A96A3;">
    <p style="margin:0;">Submitted via leapsunpartners.com · Language: ${locale.toUpperCase()}</p>
    <p style="margin:4px 0 0;">Hit reply to respond directly to ${name}.</p>
  </div>
</body>
</html>`,
      });
    } catch (emailErr) {
      // Log but don't fail — form data is already saved in Supabase
      console.error('Resend email error:', emailErr);
    }
  } else {
    console.warn('RESEND_API_KEY not set — email notification skipped');
  }

  return NextResponse.json({ success: true });
}
