import { recordAnonymousVisit } from "../../../db/analytics";

const VISITOR_ID = /^[a-zA-Z0-9-]{20,64}$/;
const DEVICES = new Set(["desktop", "tablet", "mobile"]);

function optionalText(value: unknown, maxLength: number) {
  return typeof value === "string" && value.length <= maxLength ? value : null;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return Response.json({ error: "Forbidden" }, { status: 403 });
    } catch {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const visitorId = optionalText(body.visitorId, 64);
  const path = optionalText(body.path, 240);
  const deviceType = optionalText(body.deviceType, 16);
  const consentVersion = optionalText(body.consentVersion, 24);

  if (
    !visitorId ||
    !VISITOR_ID.test(visitorId) ||
    !path ||
    !path.startsWith("/") ||
    !consentVersion ||
    (deviceType && !DEVICES.has(deviceType))
  ) {
    return Response.json({ error: "Invalid analytics event" }, { status: 400 });
  }

  try {
    await recordAnonymousVisit({
      visitorId,
      path,
      referrerOrigin: optionalText(body.referrerOrigin, 180),
      language: optionalText(body.language, 24),
    deviceType,
    devicePlatform: optionalText(body.devicePlatform, 40),
      timezone: optionalText(body.timezone, 80),
      consentVersion,
    });
    return new Response(null, { status: 204 });
  } catch {
    return Response.json({ error: "Analytics is temporarily unavailable" }, { status: 503 });
  }
}
