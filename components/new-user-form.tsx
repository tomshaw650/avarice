"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Region, User } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { userSchema } from "@/lib/validators/user"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">
}

type FormData = z.infer<typeof userSchema>

export function NewUserForm({ user }: UserNameFormProps) {
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      battletag: "",
      region: "EU",
    },
  })

  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        battletag: data.battletag,
        region: data.region,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
    }

    router.push("/home")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="battletag"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>BattleTag</FormLabel>
                <FormControl>
                  <Input placeholder="user#0000" {...field} />
                </FormControl>
                <FormDescription>
                  This will be used to get in touch with other players.
                </FormDescription>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(Region).map((key) => (
                        <SelectItem
                          key={key}
                          value={Region[key as keyof typeof Region]}
                        >
                          {Region[key as keyof typeof Region]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Set the region you play Diablo IV in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
