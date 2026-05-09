import { NextResponse } from "next/server";
import { z } from "zod";
import { replyToChatMessage } from "@/lib/chat";

const bodySchema = z.object({
  message: z.string().max(2000),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  try {
    const { reply, source } = await replyToChatMessage(parsed.data.message);
    return NextResponse.json({ reply, source });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
