import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'One Star Trading <onboarding@resend.dev>',
      to: 'user2server@gmail.com', // Your admin email
      subject: `NEW GENERAL ENQUIRY: ${service || 'General'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px;">
          <h2 style="color: #dc2626;">New Contact Form Submission</h2>
          <hr />
          <p><strong>Customer Name:</strong> ${name}</p>
          <p><strong>Email Address:</strong> ${email}</p>
          <p><strong>Contact Number:</strong> ${phone}</p>
          <p><strong>Interested Service:</strong> ${service || 'Not Specified'}</p>
          <div style="background: #f9f9f9; padding: 15px; margin-top: 20px; border-radius: 8px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <footer style="margin-top: 30px; font-size: 10px; color: #999;">
            Sent from One Star Trading Contact System
          </footer>
        </div>
      `,
    });

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}