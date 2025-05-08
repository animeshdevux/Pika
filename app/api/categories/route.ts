import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

// GET all categories
export async function GET() {
  try {
    const categories = await db.category.findMany({
      include: {
        icons: {
          select: {
            id: true,
            name: true,
            svgUrl: true,
            pngUrl: true,
          },
        },
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// POST new category (admin only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const categorySchema = z.object({
      name: z.string().min(2).max(50),
      description: z.string().optional(),
      slug: z.string().min(2).max(50),
    })

    const json = await req.json()
    const body = categorySchema.parse(json)

    const existingCategory = await db.category.findFirst({
      where: {
        OR: [{ name: body.name }, { slug: body.slug }],
      },
    })

    if (existingCategory) {
      return NextResponse.json({ error: "Category with this name or slug already exists" }, { status: 409 })
    }

    const category = await db.category.create({
      data: {
        name: body.name,
        description: body.description,
        slug: body.slug,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
