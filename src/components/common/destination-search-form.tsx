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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Briefcase, DollarSign, CalendarDays } from "lucide-react";
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  mood: z.string().min(2, {
    message: "Mood/Interests must be at least 2 characters.",
  }),
  destination: z.string().min(2, {
    message: "Destination must be at least 2 characters.",
  }),
  budget: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Please select a budget." }),
  }),
  timeOfYear: z.string().optional(),
});

export function LandingSearchForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: "",
      destination: "",
      budget: undefined, // No default for select
      timeOfYear: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const queryParams = new URLSearchParams({
      interests: values.mood,
      budget: values.budget,
    });
    if (values.timeOfYear) {
      queryParams.set('timeOfYear', values.timeOfYear);
    }
    router.push(`/search-results/${encodeURIComponent(values.destination)}?${queryParams.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end p-6 bg-card/80 backdrop-blur-sm rounded-xl shadow-2xl border"
      >
        <FormField
          control={form.control}
          name="mood"
          render={({ field }) => (
            <FormItem className="lg:col-span-1">
              <FormLabel className="text-foreground/80 font-semibold flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary"/>Mood/Interests</FormLabel>
              <FormControl>
                <Input
                  placeholder="E.g., beach, mountains, culture"
                  {...field}
                  className="h-12 text-base p-3 rounded-lg shadow-sm focus-visible:ring-primary focus-visible:ring-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem className="lg:col-span-1">
              <FormLabel className="text-foreground/80 font-semibold flex items-center gap-2"><Search className="w-4 h-4 text-primary"/>Destination</FormLabel>
              <FormControl>
                <Input
                  placeholder="E.g., Paris, Bali"
                  {...field}
                  className="h-12 text-base p-3 rounded-lg shadow-sm focus-visible:ring-primary focus-visible:ring-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem className="lg:col-span-1">
              <FormLabel className="text-foreground/80 font-semibold flex items-center gap-2"><DollarSign className="w-4 h-4 text-primary"/>Budget</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 text-base p-3 rounded-lg shadow-sm focus-visible:ring-primary focus-visible:ring-2">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="timeOfYear"
          render={({ field }) => (
            <FormItem className="lg:col-span-1">
              <FormLabel className="text-foreground/80 font-semibold flex items-center gap-2"><CalendarDays className="w-4 h-4 text-primary"/>Time of Year <span className="text-xs text-muted-foreground">(Optional)</span></FormLabel>
              <FormControl>
                <Input
                  placeholder="E.g., Summer, December"
                  {...field}
                  className="h-12 text-base p-3 rounded-lg shadow-sm focus-visible:ring-primary focus-visible:ring-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className="md:col-span-2 lg:col-span-4 h-14 p-4 mt-4 rounded-lg shadow-md bg-primary hover:bg-primary/90 text-primary-foreground focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 text-lg font-semibold w-full"
          aria-label="Find suggestions for your destination"
        >
          <Search className="h-5 w-5 mr-2" />
          Find Suggestions
        </Button>
      </form>
    </Form>
  );
}
