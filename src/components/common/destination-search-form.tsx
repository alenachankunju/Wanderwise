"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
});

export function DestinationSearchForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Search for:", values.destination);
    router.push(`/search-results/${encodeURIComponent(values.destination)}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-xl items-start space-x-3" // Use items-start for FormMessage alignment
      >
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input
                  type="search"
                  placeholder="E.g., Paris, Kyoto, Bali..."
                  {...field}
                  className="h-14 text-lg p-4 rounded-lg shadow-sm focus-visible:ring-ring focus-visible:ring-2"
                  aria-label="Search for a destination"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className="h-14 p-4 rounded-lg shadow-sm bg-accent hover:bg-accent/90 text-accent-foreground focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Submit search"
        >
          <Search className="h-5 w-5 sm:mr-2" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </form>
    </Form>
  );
}
