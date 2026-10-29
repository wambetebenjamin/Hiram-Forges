import { NextResponse } from "next/server";
import { verifyCaptcha } from "../../lib/captcha";
import { site, whatsappLink } from "../../lib/site";

export const runtime = "nodejs";

const hits = new Map<string, { count: number; at: number }>();

function limited(ip: string): boolean {
  const now = Date.now();
  const record = hits.get(ip);
  if (!record || now - record.at > 60_000) {
    hits.set(ip, { count: 1, at: now });
    return false;
  }
  record.count += 1;
  return record.count > 4;
}

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Try again in a minute." },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (text(payload.website, 10)) {
    return NextResponse.json({ ok: true, id: `HF-${Date.now()}` });
  }

  const errors: Record<string, string> = {};
  const workshop = text(payload.workshop, 120);
  const name = text(payload.name, 100);
  const city = text(payload.city, 80);
  const country = text(payload.country, 80);
  const phone = text(payload.phone, 40);
  const email = text(payload.email, 160);
  const about = text(payload.about, 500);
  const languages = text(payload.languages, 120);
  const since = text(payload.since, 4);
  const specialties = Array.isArray(payload.specialties)
    ? payload.specialties.filter((item): item is string => typeof item === "string").slice(0, 6)
    : [];

  if (workshop.length < 2) errors.workshop = "Give the workshop name.";
  if (name.length < 2) errors.name = "Give a contact name.";
  if (city.length < 2) errors.city = "Give the city or town.";
  if (country.length < 2) errors.country = "Choose a country.";
  if (!/^[+0-9 ()-]{7,40}$/.test(phone)) errors.phone = "Check the phone number.";
  if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) errors.email = "Check the email address.";
  if (about.length < 40) errors.about = "Add at least 40 characters about the workshop.";
  if (specialties.length === 0) errors.specialties = "Choose at least one kind of work.";
  if (since && !/^(19|20)\d{2}$/.test(since)) errors.since = "Use a four digit year.";
  if (payload.consent !== true) errors.consent = "Confirm the listing terms to continue.";

  const captcha = await verifyCaptcha(
    typeof payload.captchaToken === "string" ? payload.captchaToken : undefined,
    typeof payload.captchaProvider === "string" ? payload.captchaProvider : undefined,
  );
  if (!captcha.ok) {
    errors.captcha = "Complete the spam check.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const id = `HF-${Date.now().toString(36).toUpperCase()}`;

  const summary = [
    `New workshop listing ${id}`,
    `Workshop: ${workshop}`,
    `Contact: ${name}`,
    `Location: ${city}, ${country}`,
    `Work: ${specialties.join(", ")}`,
    `Since: ${since || "not given"}`,
    `Languages: ${languages || "not given"}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `About: ${about}`,
  ].join("\n");

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  let delivered = false;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "listing", id, summary, payload }),
      });
      delivered = response.ok;
    } catch {
      delivered = false;
    }
  }

  return NextResponse.json({
    ok: true,
    id,
    delivered,
    waLink: whatsappLink(summary),
    site: site.name,
  });
}
