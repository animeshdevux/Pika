import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

// GET all icons or filtered by category
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId")
    const search = searchParams.get("search")

    let whereClause = {}

    if (categoryId) {
      whereClause = {
        ...whereClause,
        categoryId,
      }
    }

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { tags: { has: search } },
        ],
      }
    }

    const icons = await db.icon.findMany({
      where: whereClause,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    return NextResponse.json(icons)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// POST new icon (admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const iconSchema = z.object({
      name: z.string().min(2).max(50),
      description: z.string().optional(),
      svgUrl: z.string().url(),
      pngUrl: z.string().url().optional(),
      tags: z.array(z.string()).optional(),
      categoryId: z.string(),
    })

    const json = await req.json()
    const body = iconSchema.parse(json)

    const icon = await db.icon.create({
      data: {
        name: body.name,
        description: body.description,
        svgUrl: body.svgUrl,
        pngUrl: body.pngUrl,
        tags: body.tags || [],
        categoryId: body.categoryId,
      },
    })

    return NextResponse.json(icon)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
