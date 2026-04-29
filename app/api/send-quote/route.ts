import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend automatically looks for the process.env.RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, country, city, address, vehicleName, vehicleId, priceFob } = body;

    const data = await resend.emails.send({
      from: 'One Star Trading <onboarding@resend.dev>', // Keep this for testing
      to: 'user2server@gmail.com', // Your admin email
      subject: `PRO-FORMA REQUEST: ${vehicleName} (ID: ${vehicleId})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">New Quotation Request</h2>
          
          <div style="background: #f9f9f9; padding: 15px; margin: 20px 0;">
            <p><strong>Vehicle:</strong> ${vehicleName}</p>
            <p><strong>Stock ID:</strong> ${vehicleId}</p>
            <p><strong>FOB Price:</strong> USD ${priceFob}</p>
          </div>

          <h3>Customer Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Port/City:</strong> ${city}, ${country}</p>
          <p><strong>Full Address:</strong> ${address}</p>
          
          <footer style="margin-top: 30px; font-size: 10px; color: #999; text-align: center;">
            Sent from One Star Trading Lead System
          </footer>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}