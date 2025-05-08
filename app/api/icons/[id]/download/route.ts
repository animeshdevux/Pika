import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(req.url)
    const format = searchParams.get("format") || "svg"
    const session = await getServerSession(authOptions)

    const icon = await db.icon.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!icon) {
      return NextResponse.json({ error: "Icon not found" }, { status: 404 })
    }

    const url = format === "svg" ? icon.svgUrl : icon.pngUrl

    if (!url) {
      return NextResponse.json({ error: `No ${format.toUpperCase()} available for this icon` }, { status: 404 })
    }

    // Record download if user is logged in
    if (session) {
      await db.download.create({
        data: {
          userId: session.user.id,
          iconId: icon.id,
          format,
        },
      })
    }

    return NextResponse.json({ url })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
