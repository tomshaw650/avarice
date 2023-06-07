import { NewListingForm } from "@/components/new-listing-form"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"

export default async function IndexPage() {
  const user = getCurrentUser().then((user) => {
    if (!user) {
      redirect("/login")
    }

    return user;
  })

  const { id } = await user;

  const types = await db.type.findMany({
    select: {
      id: true,
      name: true,
    }
  });

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Create a listing
        </h1>
        <NewListingForm id={id} types={types} />
      </div>
    </section>
  )
}
