import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"

import { ProfileHeader } from "@/components/header"
import { ProfileShell } from "@/components/shell"
import { EditForm } from "@/components/edit-form"

export const metadata = {
  title: "Profile",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/")
  }

  return (
    <ProfileShell className="ml-5 mt-10">
      <ProfileHeader heading="Profile" text="Edit your profile details" />
      <div className="grid gap-10">
        <EditForm user={user} />
      </div>
    </ProfileShell>
  )
}