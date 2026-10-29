export type CaptchaProvider = "v3" | "v2" | "local";

export type CaptchaCheck = {
  ok: boolean;
  provider: CaptchaProvider;
  reason?: string;
};

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export async function verifyCaptcha(
  token: string | undefined,
  provider: string | undefined,
): Promise<CaptchaCheck> {
  const kind: CaptchaProvider =
    provider === "v3" || provider === "v2" ? provider : "local";
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (kind === "local") {
    if (!token || !token.startsWith("local:")) {
      return { ok: false, provider: kind, reason: "confirmation-required" };
    }
    return { ok: true, provider: kind };
  }

  if (!secret) {
    // No server key configured: the widget still proves a human interaction on
    // the client, but we cannot verify it with Google. Do not block the form.
    return { ok: true, provider: kind, reason: "verification-not-configured" };
  }

  if (!token) {
    return { ok: false, provider: kind, reason: "missing-token" };
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      cache: "no-store",
    });
    const data = (await response.json()) as {
      success?: boolean;
      score?: number;
      "error-codes"?: string[];
    };
    const lowScore = kind === "v3" && typeof data.score === "number" && data.score < 0.4;
    if (!data.success || lowScore) {
      return {
        ok: false,
        provider: kind,
        reason: (data["error-codes"] ?? []).join(",") || "challenge-failed",
      };
    }
    return { ok: true, provider: kind };
  } catch {
    return { ok: false, provider: kind, reason: "verification-unavailable" };
  }
}
