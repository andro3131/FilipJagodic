import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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

export async function POST(req: NextRequest) {
  if (!verifyToken(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const storageKey = process.env.BUNNY_STORAGE_API_KEY;
  const storageZone = process.env.BUNNY_STORAGE_ZONE;
  const storageRegion = process.env.BUNNY_STORAGE_REGION || "storage.bunnycdn.com";
  const cdnUrl = process.env.BUNNY_CDN_URL || "https://filip-jagodic.b-cdn.net";

  if (!storageKey || !storageZone) {
    return NextResponse.json(
      { error: "Bunny Storage ni konfiguriran" },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "Datoteka manjka" }, { status: 400 });
    }

    // Sanitize filename
    const timestamp = Date.now();
    const safeName = file.name
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .replace(/_+/g, "_");
    const fileName = `${timestamp}_${safeName}`;
    const storagePath = `${folder}/${fileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const res = await fetch(
      `https://${storageRegion}/${storageZone}/${storagePath}`,
      {
        method: "PUT",
        headers: {
          AccessKey: storageKey,
          "Content-Type": "application/octet-stream",
        },
        body: buffer,
      }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Napaka pri nalaganju: " + text },
        { status: 500 }
      );
    }

    const publicUrl = `${cdnUrl}/${storagePath}`;

    return NextResponse.json({ url: publicUrl });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Neznana napaka";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
