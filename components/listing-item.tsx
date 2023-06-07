import Link from "next/link"
import { Listing, Type } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ListingOperations } from "@/components/listing-operations"

interface ListingItemProps {
  listing: Pick<Listing, "id" | "name" | "createdAt"> & {
    type: Pick<Type, "name">
  }
}

export function ListingItem({ listing }: ListingItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${listing.id}`}
          className="font-semibold hover:underline"
        >
          {listing.name ? listing.name : listing.type.name}
        </Link>
        <div>
          <p className="mb-2 text-sm text-muted-foreground">{listing.type.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDate(listing.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      <ListingOperations listing={{ id: listing.id, name: listing.name }} />
    </div>
  )
}

ListingItem.Skeleton = function ListingItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}