import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTravelSuggestions, GenerateTravelSuggestionsInput } from '@/ai/flows/generate-travel-suggestions';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface SearchResultsPageProps {
  params: {
    destination: string;
  };
}

async function TravelSuggestions({ destination }: { destination: string }) {
  const decodedDestination = decodeURIComponent(destination);

  // For demonstration, we'll use some default values for interests, budget, and timeOfYear.
  // In a real application, you might get these from user input or other sources.
  const input: GenerateTravelSuggestionsInput = {
    destination: decodedDestination,
    interests: 'history, food, nature',
    budget: 'medium',
    timeOfYear: 'any',
  };

  try {
    const travelOutput = await generateTravelSuggestions(input);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{travelOutput.suggestions}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{travelOutput.activities}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Places to Stay</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{travelOutput.placesToStay}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg md:col-span-2 lg:col-span-1">
           <CardHeader>
            <CardTitle className="text-2xl font-headline">Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">{travelOutput.restaurants}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Destination Image</CardTitle>
          </CardHeader>
          <CardContent>
            <Image 
              src={`https://placehold.co/600x400.png`} 
              alt={`Image of ${decodedDestination}`} 
              width={600} 
              height={400} 
              className="rounded-md object-cover"
              data-ai-hint={`${decodedDestination} landmark`}
            />
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Error generating travel suggestions:", error);
    return (
      <Card className="shadow-lg rounded-lg bg-destructive text-destructive-foreground">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Sorry, we couldn't fetch travel suggestions at this time. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }
}

function TravelSuggestionsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="shadow-lg rounded-lg">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      ))}
       <Card className="shadow-lg rounded-lg md:col-span-2 lg:col-span-1">
          <CardHeader>
             <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-lg md:col-span-2 lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-8 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-[400px] rounded-md" />
          </CardContent>
        </Card>
    </div>
  );
}


export default function SearchResultsPage({ params }: SearchResultsPageProps) {
  const destination = params.destination;
  const decodedDestination = decodeURIComponent(destination);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <SiteHeader />
      <main className="flex-grow container py-12 lg:py-16">
        <div className="mb-10 text-center">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Explore <span className="text-primary-foreground bg-primary px-2 rounded-md">{decodedDestination}</span>
          </h1>
          <p className="font-body text-lg sm:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Discover AI-curated suggestions for your adventure in {decodedDestination}.
          </p>
        </div>
        <Suspense fallback={<TravelSuggestionsSkeleton />}>
          <TravelSuggestions destination={destination} />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
