
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTravelSuggestions, GenerateTravelSuggestionsInput } from '@/ai/flows/generate-travel-suggestions';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { AlertCircle, Lightbulb, MapPin, Utensils, BedDouble, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SearchResultsPageProps {
  params: {
    destination: string;
  };
  searchParams: {
    interests?: string;
    budget?: string;
    timeOfYear?: string;
  };
}

async function TravelSuggestions({ destination: rawDestination, interests, budget, timeOfYear }: { destination: string, interests?: string, budget?: string, timeOfYear?: string }) {
  let decodedDestination: string;

  try {
    decodedDestination = decodeURIComponent(rawDestination);
  } catch (decodingError) {
    console.error("Error decoding destination from URL:", decodingError, "Original destination param:", rawDestination);
    return (
      <Card className="shadow-lg rounded-lg bg-destructive/10 border-destructive text-destructive-foreground col-span-full">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
            <AlertCircle className="h-6 w-6" />
            Invalid Destination URL
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>The destination <code className="bg-muted px-1 py-0.5 rounded-sm">{rawDestination}</code> provided in the URL could not be processed. Please check the link and try again.</p>
          {decodingError instanceof Error && <p className="text-xs mt-2">Error details: {decodingError.message}</p>}
        </CardContent>
      </Card>
    );
  }

  const input: GenerateTravelSuggestionsInput = {
    destination: decodedDestination,
    interests: interests || 'general sightseeing, local culture',
    budget: budget || 'medium',
    timeOfYear: timeOfYear || 'any',
  };

  try {
    const travelOutput = await generateTravelSuggestions(input);

    if (!travelOutput || !travelOutput.suggestions) {
      // Handle cases where the AI might return an empty or unexpected valid response
      console.error(`AI returned no suggestions for '${decodedDestination}'. Input:`, input, "Output:", travelOutput);
      return (
        <Card className="shadow-lg rounded-lg bg-amber-500/10 border-amber-600 text-amber-700 col-span-full">
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2">
              <Lightbulb className="h-6 w-6" />
              No Specific Suggestions Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>While we couldn't generate specific suggestions for {decodedDestination} with the current criteria, try broadening your search or checking back later!</p>
          </CardContent>
        </Card>
      );
    }
    

    const sections = [
      { title: "Overall Suggestions", content: travelOutput.suggestions, icon: <Lightbulb className="h-6 w-6 text-primary" />, id: "suggestions" },
      { title: "Potential Activities", content: travelOutput.activities, icon: <Sparkles className="h-6 w-6 text-primary" />, id: "activities" },
      { title: "Places to Stay", content: travelOutput.placesToStay, icon: <BedDouble className="h-6 w-6 text-primary" />, id: "placesToStay" },
      { title: "Restaurant Recommendations", content: travelOutput.restaurants, icon: <Utensils className="h-6 w-6 text-primary" />, id: "restaurants" },
    ];
    
    const imageHint = `${decodedDestination} ${interests ? interests.split(',')[0] : 'travel'}`;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {sections.map(section => (
            <Card key={section.id} className="shadow-xl rounded-xl border-border/50 overflow-hidden">
              <CardHeader className="bg-card">
                <CardTitle className="text-3xl font-headline flex items-center gap-3 text-foreground">
                  {section.icon}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none text-foreground/90 pt-4 font-body">
                {section.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="mb-4 last:mb-0">{paragraph}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-1 space-y-8">
          <Card className="shadow-xl rounded-xl border-border/50 sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl font-headline flex items-center gap-3 text-foreground">
                <MapPin className="h-6 w-6 text-primary" />
                Your Trip Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 font-body">
              <div>
                <h4 className="font-semibold text-foreground">Destination:</h4>
                <p className="text-muted-foreground">{decodedDestination}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Interests:</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(interests || 'Not specified').split(',').map(interest => (
                    <Badge key={interest.trim()} variant="secondary" className="text-sm">{interest.trim()}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Budget:</h4>
                <Badge variant="secondary" className="capitalize text-sm">{budget || 'Not specified'}</Badge>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Time of Year:</h4>
                <p className="text-muted-foreground capitalize">{timeOfYear || 'Not specified'}</p>
              </div>
               <div className="mt-6">
                <Image 
                  src={`https://placehold.co/600x400.png`} 
                  alt={`Image of ${decodedDestination}`} 
                  width={600} 
                  height={400} 
                  className="rounded-lg object-cover w-full shadow-md"
                  data-ai-hint={imageHint}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error generating travel suggestions for '${decodedDestination}'. Input:`, input, 'Error:', error);
    let errorMessage = "We encountered an issue while generating travel suggestions. Please try refreshing the page or searching again later.";
    if (error instanceof Error && error.message.includes('API key not valid')) {
        errorMessage = "The AI service API key is invalid or missing. Please check the server configuration.";
    } else if (error instanceof Error) {
        errorMessage = `An unexpected error occurred: ${error.message}. Please try again.`;
    }

    return (
      <Card className="shadow-lg rounded-lg bg-destructive/10 border-destructive text-destructive-foreground col-span-full">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
            <AlertCircle className="h-6 w-6" />
            Error Fetching Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>For destination: <code className="bg-muted px-1 py-0.5 rounded-sm">{decodedDestination}</code></p>
          <p>{errorMessage}</p>
          <p className="text-xs mt-2">If the problem persists, our team has been notified. You may check the server console for more details.</p>
        </CardContent>
      </Card>
    );
  }
}

function TravelSuggestionsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="shadow-xl rounded-xl border-border/50">
            <CardHeader>
              <Skeleton className="h-8 w-3/4 rounded-md" />
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-4/6 rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="lg:col-span-1 space-y-8">
        <Card className="shadow-xl rounded-xl border-border/50 sticky top-24">
          <CardHeader>
            <Skeleton className="h-7 w-1/2 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-5 w-3/4 rounded-md" />
            <Skeleton className="h-5 w-1/2 rounded-md" />
            <Skeleton className="h-5 w-2/3 rounded-md" />
            <Skeleton className="w-full h-[200px] rounded-lg mt-4" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


export default function SearchResultsPage({ params, searchParams }: SearchResultsPageProps) {
  const { destination } = params;
  const { interests, budget, timeOfYear } = searchParams;
  
  let displayDestination: string;
  try {
    displayDestination = decodeURIComponent(destination);
  } catch (e) {
    // If decoding fails for the header, use the raw param for display and let TravelSuggestions handle the detailed error.
    displayDestination = destination; 
  }


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <SiteHeader />
      <main className="flex-grow container py-12 lg:py-16">
        <div className="mb-10 text-center">
          <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground">
            Explore <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{displayDestination}</span>
          </h1>
          <p className="font-body text-lg sm:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            AI-curated travel suggestions for your adventure in {displayDestination}, tailored to your preferences.
          </p>
        </div>
        <Suspense fallback={<TravelSuggestionsSkeleton />}>
          <TravelSuggestions 
            destination={destination} 
            interests={interests}
            budget={budget}
            timeOfYear={timeOfYear}
          />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}

