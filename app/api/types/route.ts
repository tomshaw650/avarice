import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  const res = await db.type.findMany({
    select: {
      id: true,
      name: true,
    }
  })

  return NextResponse.json(res)
}
