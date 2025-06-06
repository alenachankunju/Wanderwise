
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { BookingDialog } from '@/components/booking/booking-dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { CheckCircle2 } from 'lucide-react';

const dubaiDestinations = [
  {
    name: "Burj Khalifa",
    description: "Experience breathtaking views from the world’s tallest building.",
    image: "/assets/burj-khalifa.jpg", // Corrected path
    imageHint: "Burj Khalifa skyscraper",
  },
  {
    name: "Palm Jumeirah",
    description: "Explore the iconic man-made island shaped like a palm tree.",
    image: "https://placehold.co/400x300.png",
    imageHint: "Palm Jumeirah aerial",
  },
  {
    name: "Dubai Desert Safari",
    description: "Embark on an thrilling adventure through the Arabian dunes.",
    image: "https://placehold.co/400x300.png",
    imageHint: "desert safari adventure",
  },
  {
    name: "Dubai Mall & Aquarium",
    description: "Shop at one of the world's largest malls and visit the stunning aquarium.",
    image: "https://placehold.co/400x300.png",
    imageHint: "Dubai Mall interior",
  },
  {
    name: "Al Fahidi Historical District",
    description: "Step back in time and explore Dubai's rich culture and tradition.",
    image: "https://placehold.co/400x300.png",
    imageHint: "Al Fahidi architecture",
  },
];

export function FeaturedDestinationsDubaiSection() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const handleOpenBookingModal = (destinationName: string) => {
    setSelectedDestination(destinationName);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = () => {
    setIsBookingModalOpen(false);
    setIsThankYouModalOpen(true);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
            ✨ Popular in <span className="text-primary">Dubai</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
            Discover some of the most iconic attractions and experiences Dubai has to offer.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {dubaiDestinations.map((destination) => (
            <Card key={destination.name} className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg border-border/50 overflow-hidden flex flex-col">
              <div className="relative w-full h-56">
                <Image
                  src={destination.image}
                  alt={`Image of ${destination.name}`}
                  fill 
                  objectFit="cover"
                  data-ai-hint={destination.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground font-headline">{destination.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground font-body text-sm">{destination.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" 
                  aria-label={`Book ${destination.name}`}
                  onClick={() => handleOpenBookingModal(destination.name)}
                >
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedDestination && (
        <BookingDialog
          isOpen={isBookingModalOpen}
          onOpenChange={setIsBookingModalOpen}
          destinationName={selectedDestination}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      <AlertDialog open={isThankYouModalOpen} onOpenChange={setIsThankYouModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              Booking Confirmed!
            </AlertDialogTitle>
            <AlertDialogDescription>
              🎉 Thank you for booking with WanderWise! Our team will reach out to you shortly.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsThankYouModalOpen(false)}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
