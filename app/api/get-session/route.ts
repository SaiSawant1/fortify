import { getUserSession } from "@/lib/auth/server";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getUserSession();
  if (!session) {
    return new NextResponse("INTERNAL Server Error");
  }

  return NextResponse.json(session);
}
