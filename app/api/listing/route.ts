import { listingSchema } from "@/lib/validators/listing";
import * as z from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return new Response("Unauthorised", { status: 403 })
    }

    const json = await req.json()
    const body = listingSchema.parse(json)

    // create db listing, which needs to connect to user and stat
    const listing = await db.listing.create({
      data: {
        name: body.name,
        type: body.type,
        power: body.power,
        tier: body.tier,
        price: body.price,
        lister: {
          connect: {
            id: user.id,
          },
        },
        stats: {
          create: body.stats,
        },
      },
    })

    return new Response(JSON.stringify(listing), { status: 200 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 } )
    }

    return new Response(null, { status: 500 })
  }
}