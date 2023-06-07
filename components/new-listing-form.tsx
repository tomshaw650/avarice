"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { listingSchema } from "@/lib/validators/listing"
import type { Type } from "@prisma/client"
import { Tier } from "@prisma/client"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { Separator } from "./ui/separator"
import { AddStatButton, RemoveStatButton } from "./buttons"
import { Icons } from "./icons"

interface NewListingProps {
  id: string
  types: Type[]
}

type statData = {
  name: string,
  range: string,
}

type FormData = z.infer<typeof listingSchema>

export function NewListingForm({ id, types }: NewListingProps) {
  const [stats, setStats] = React.useState<statData[]>([]);
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      name: "",
      type: "",
      power: 0,
      tier: "BASE",
      stats: [],
      price: ""
    },
  })

  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/listing/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        type: data.type,
        power: data.power,
        tier: data.tier,
        stats: stats,
        price: data.price,
        lister: id,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      console.error("Something went wrong", response?.status, JSON.stringify(response?.body))
      return
    }

    // routing to newly created listing would be preferable
    router.push('/')
  }

  const handleAddStat = () => {
    const newStat = {
      name: "",
      range: "",
    };

    setStats((prevStats) => [...prevStats, newStat]);
  };

  const handleRemoveStat = (index: number) => {
    setStats((prevStats) => {
      const updatedStats = [...prevStats];
      updatedStats.splice(index, 1);
      return updatedStats;
    });
  };

  const handleStatChange = (index: number, field: keyof statData, value: string) => {
    setStats((prevStats) => {
      const updatedStats = [...prevStats];
      updatedStats[index] = {
        ...updatedStats[index],
        [field]: value,
      };
      return updatedStats;
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="The Grandfather" {...field} />
              </FormControl>
              <FormDescription>Optional. Leave blank and the item type will be listed instead.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[215px]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {types.map((type: Type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="power"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Power</FormLabel>
              <FormControl>
                <Input type="number" onChange={event => field.onChange(+event.target.value)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Tier</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[215px]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(Tier).map((key) => (
                    <SelectItem
                      key={key}
                      value={Tier[key as keyof typeof Tier]}
                    >
                      {Tier[key as keyof typeof Tier]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="stats"
          render={({ field }) => (
            <>
              <div className="mb-5 flex items-center gap-x-3">
                <h2 className="text-xl font-extrabold leading-tight tracking-tighter md:text-2xl">Add stats: </h2>
                <AddStatButton addStat={handleAddStat} />
              </div>
              {stats.map((stat, index) => (
                <div className="mt-5" key={index}>
                  <FormLabel>{`Stat ${index + 1}`}</FormLabel>
                  <div className="flex items-center gap-x-5">
                    <FormItem>
                      <Input
                        {...field}
                        value={stat.name}
                        onChange={(e) => handleStatChange(index, 'name', e.target.value)}
                        placeholder="Affix"
                      />
                    </FormItem>
                    <span>:</span>
                    <FormItem>
                      <Input
                        {...field}
                        value={stat.range}
                        onChange={(e) => handleStatChange(index, 'range', e.target.value)}
                        placeholder={`Value`}
                      />
                    </FormItem>
                    <RemoveStatButton removeStat={handleRemoveStat} />
                  </div>
                </div>
              ))}
            </>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="500,000 gold" {...field} />
              </FormControl>
              <FormDescription>Optionally add a price. Users will send offers if no price is set.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={cn(buttonVariants())}>
          {isSaving && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          <span>Create</span>
        </Button>
      </form>
    </Form>
  )
}
