import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Napačno geslo" }, { status: 401 });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    return NextResponse.json({ token, expiresIn: "24h" });
  } catch {
    return NextResponse.json({ error: "Napaka strežnika" }, { status: 500 });
  }
}
