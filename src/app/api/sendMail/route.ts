import { createTransport } from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const emailPassword = process.env.NEXT_EMAIL_PASSWORD;
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "kavach184@gmail.com",
      pass: emailPassword,
    },
  });
  const req = await request.json();
  console.log(req);

  const mailData = {
    from: '"Kavach HelpDesk" <kavach184@gmail.com>"',
    to: "vikrantsingh202004@gmail.com",
    subject: `Disaster Created!`,
    html: `
    <div>
    <h1>Disaster Created!</h1>
    <p>Location: ${req.location}</p>
    <p>Disaster Type: ${req.disasterType}</p>
    <p>Description: ${req.description}</p>
    <p>Help ID: ${req.help_id}</p>
    <p>Status: ${req.status}</p>
    </div>
    `
  };

  try {
    const mail = await transporter.sendMail(mailData);
    console.log("Success " + mail.response);
    return NextResponse.json({
      status: 200,
      body: { success: true, message: "Message Sent" },
    });
  } catch (error) {
    console.error("Error: " + error);
    return NextResponse.json({
      status: 500,
      body: { success: false, message: "Error" },
    });
  }
}
