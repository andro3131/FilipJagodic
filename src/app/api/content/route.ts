import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ALLOWED_FILES: Record<string, string> = {
  hero: "content/hero.json",
  about: "content/about.json",
  encounters: "content/encounters.json",
  gallery: "content/gallery.json",
  music: "content/music.json",
  studio: "content/studio.json",
  collections: "content/collections.json",
  contact: "content/contact.json",
  biography: "content/biography.json",
  "messages-sl": "messages/sl.json",
  "messages-en": "messages/en.json",
};

function verifyToken(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) return false;
  try {
    jwt.verify(auth.slice(7), process.env.JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!verifyToken(req)) {
    return NextResponse.json({ error: "Neavtoriziran" }, { status: 401 });
  }

  const file = req.nextUrl.searchParams.get("file");
  if (!file || !ALLOWED_FILES[file]) {
    return NextResponse.json({ error: "Neveljavna datoteka" }, { status: 400 });
  }

  const path = ALLOWED_FILES[file];
  const repo = process.env.GITHUB_REPO!;
  const token = process.env.GITHUB_TOKEN!;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Napaka pri branju iz GitHub" },
        { status: res.status }
      );
    }

    const ghData = await res.json();
    const content = JSON.parse(
      Buffer.from(ghData.content, "base64").toString("utf-8")
    );

    return NextResponse.json({ data: content, sha: ghData.sha });
  } catch {
    return NextResponse.json({ error: "Napaka strežnika" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!verifyToken(req)) {
    return NextResponse.json({ error: "Neavtoriziran" }, { status: 401 });
  }

  const file = req.nextUrl.searchParams.get("file");
  if (!file || !ALLOWED_FILES[file]) {
    return NextResponse.json({ error: "Neveljavna datoteka" }, { status: 400 });
  }

  const path = ALLOWED_FILES[file];
  const repo = process.env.GITHUB_REPO!;
  const token = process.env.GITHUB_TOKEN!;

  try {
    const { data, sha } = await req.json();

    const encoded = Buffer.from(
      JSON.stringify(data, null, 2) + "\n",
      "utf-8"
    ).toString("base64");

    const res = await fetch(
      `https://api.github.com/repos/${repo}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Posodobitev ${path} prek admin panela`,
          content: encoded,
          sha,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(
        { error: err.message || "Napaka pri pisanju v GitHub" },
        { status: res.status }
      );
    }

    const result = await res.json();

    // Trigger Vercel rebuild
    if (process.env.VERCEL_DEPLOY_HOOK) {
      fetch(process.env.VERCEL_DEPLOY_HOOK, { method: "POST" }).catch(() => {});
    }

    return NextResponse.json({ success: true, sha: result.content.sha });
  } catch {
    return NextResponse.json({ error: "Napaka strežnika" }, { status: 500 });
  }
}
