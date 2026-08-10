import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/utils";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  subject?: string;
  message?: string;
  /** champ piège anti-spam : doit rester vide */
  website?: string;
};

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { name, email, company, subject, message, website } = body;

  // Honeypot : un bot remplit ce champ caché.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Merci de renseigner votre nom, votre email et votre message." },
      { status: 400 }
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || `Smart Solutions <${site.email}>`;

  // Pas encore configuré : le front basculera sur un repli mailto.
  if (!apiKey) {
    return NextResponse.json(
      { configured: false, error: "Service d'envoi non configuré." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2>Nouveau message — Smart Solutions</h2>
    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
    <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    ${company ? `<p><strong>Société :</strong> ${escapeHtml(company)}</p>` : ""}
    <p><strong>Sujet :</strong> ${escapeHtml(subject || "—")}</p>
    <hr />
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[Contact] ${subject || "Nouveau message"} — ${name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "L'envoi a échoué. Merci de réessayer." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue. Merci de réessayer." },
      { status: 500 }
    );
  }
}
