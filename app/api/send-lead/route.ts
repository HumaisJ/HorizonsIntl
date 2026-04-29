import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, full_name, email, telephone, address, city, country, service_name, message } = body;

    // 1. Save to Database first (Safety backup)
    const { error: dbError } = await supabase.from("leads").insert([body]);
    if (dbError) throw dbError;

    // 2. Prepare Email Content
    const subject = type === 'quote' 
      ? `NEW QUOTE REQUEST: ${service_name}` 
      : `NEW SERVICE INQUIRY: ${service_name}`;

    const { data, error } = await resend.emails.send({
      from: 'One Star CMS <onboarding@resend.dev>', // You can verify your domain later
      to: 'user2server@gmail.com', // Your pre-fixed admin email
      subject: subject,
      html: `
        <div style="font-family: sans-serif; border-left: 4px solid #dc2626; padding: 20px;">
          <h2 style="text-transform: uppercase;">New ${type} Lead</h2>
          <p><strong>Service/Car:</strong> ${service_name}</p>
          <hr />
          <p><strong>Name:</strong> ${full_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${telephone}</p>
          <p><strong>Location:</strong> ${address}, ${city}, ${country}</p>
          <p><strong>Message:</strong> ${message || 'No remarks provided.'}</p>
        </div>
      `,
    });

    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json({ message: 'Lead processed successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}