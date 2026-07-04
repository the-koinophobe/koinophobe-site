import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Self-hosted contact endpoint: no third-party form service, leads go
// straight to your inbox over Gmail SMTP.
//
// Required env vars (server-side only, never exposed to the browser):
//   CONTACT_SMTP_USER  your Gmail address (thekoinophobe@gmail.com)
//   CONTACT_SMTP_PASS  a Gmail App Password (Google Account -> Security ->
//                      2-Step Verification -> App passwords)
// Optional:
//   CONTACT_TO         where leads land (defaults to CONTACT_SMTP_USER)

export const runtime = "nodejs";

const MAX_LEN = 4000;

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  // Honeypot: real users never fill this.
  if (data.botcheck) {
    return NextResponse.json({ ok: true });
  }

  const name = String(data.name ?? "").trim().slice(0, 200);
  const email = String(data.email ?? "").trim().slice(0, 200);
  const website = String(data.website ?? "").trim().slice(0, 300);
  const type = String(data.type ?? "").trim().slice(0, 100);
  const message = String(data.message ?? "").trim().slice(0, MAX_LEN);

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  const user = process.env.CONTACT_SMTP_USER;
  const pass = process.env.CONTACT_SMTP_PASS;
  if (!user || !pass) {
    // Not configured yet: tell the client so it can fall back to mailto.
    return NextResponse.json({ ok: false, error: "Not configured" }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Koinophobe site" <${user}>`,
      to: process.env.CONTACT_TO || user,
      replyTo: `"${name.replace(/"/g, "'")}" <${email}>`,
      subject: `Lead: ${name}${type ? ` (${type})` : ""} — koinophobe.com`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Website: ${website || "-"}`,
        `Type: ${type || "-"}`,
        "",
        message || "(no message)",
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 502 });
  }
}
