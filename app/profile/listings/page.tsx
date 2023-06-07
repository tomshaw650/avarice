import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { db } from "@/lib/db"

import { ProfileHeader } from "@/components/header"
import { ProfileShell } from "@/components/shell"
import { ListingItem } from "@/components/listing-item"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { ListingPageButton } from "@/components/buttons"

export const metadata = {
  title: "Profile",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  const listings = await db.listing.findMany({
    where: {
      lister: {
        id: user.id
      }
    },
    include: {
      type: true,
      stats: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  console.log(listings)

  return (
    <ProfileShell className="ml-5 mt-10">
      <ProfileHeader heading="Listings" text="Manage your current listings here" />
      <div>
        {listings?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {listings.map((listing) => (
              <ListingItem key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Title>No items listed</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You haven&apos;t posted an item yet. Try listing an item!
            </EmptyPlaceholder.Description>
            <ListingPageButton />
          </EmptyPlaceholder>
        )}
      </div>
    </ProfileShell>
  )
}