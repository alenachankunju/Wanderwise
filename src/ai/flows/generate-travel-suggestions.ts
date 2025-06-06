'use server';

/**
 * @fileOverview A travel suggestion AI agent.
 *
 * - generateTravelSuggestions - A function that handles the travel suggestion process.
 * - GenerateTravelSuggestionsInput - The input type for the generateTravelSuggestions function.
 * - GenerateTravelSuggestionsOutput - The return type for the generateTravelSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTravelSuggestionsInputSchema = z.object({
  destination: z.string().describe('The destination to generate travel suggestions for.'),
  interests: z
    .string()
    .describe(
      'The interests of the user, such as history, nature, food, or adventure. Separate multiple interests by commas.'
    ),
  budget: z.string().describe('The budget of the user, such as low, medium, or high.'),
  timeOfYear: z
    .string()
    .describe('The time of year the user is traveling, such as summer, winter, or spring.'),
});
export type GenerateTravelSuggestionsInput = z.infer<typeof GenerateTravelSuggestionsInputSchema>;

const NearbyPointSchema = z.object({
  name: z.string().describe('Name of the nearby point of interest.'),
  description: z.string().describe('A brief description of the nearby point.'),
  lat: z.number().describe('Plausible latitude of the nearby point. This should be a valid floating point number.'),
  lng: z.number().describe('Plausible longitude of the nearby point. This should be a valid floating point number.'),
  photoUrl: z.string().optional().describe("URL to a representative photo of the point. If unknown, provide a relevant placeholder image URL from https://placehold.co, e.g., https://placehold.co/300x200.png. Include data-ai-hint for placeholder with keywords."),
  rating: z.number().optional().min(1).max(5).describe('An overall rating from 1 to 5, if a common rating is known.'),
});

const GenerateTravelSuggestionsOutputSchema = z.object({
  suggestions: z.string().describe('The overall travel suggestions for the main destination.'),
  activities: z.string().describe('Potential activities for the main destination.'),
  placesToStay: z.string().describe('Potential places to stay for the main destination.'),
  restaurants: z.string().describe('Potential restaurants for the main destination.'),
  destinationCoordinates: z.object({
    lat: z.number().describe('Plausible latitude of the main destination. This should be a valid floating point number.'),
    lng: z.number().describe('Plausible longitude of the main destination. This should be a valid floating point number.'),
  }).describe('Plausible geographic coordinates of the main travel destination.'),
  nearbyAttractions: z.array(NearbyPointSchema).max(5).describe('Up to 5 attractive and distinct nearby destinations or points of interest, each with geographic data. These should be genuinely interesting for a tourist and different from the main destination.')
});
export type GenerateTravelSuggestionsOutput = z.infer<typeof GenerateTravelSuggestionsOutputSchema>;

export async function generateTravelSuggestions(
  input: GenerateTravelSuggestionsInput
): Promise<GenerateTravelSuggestionsOutput> {
  return generateTravelSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTravelSuggestionsPrompt',
  input: {schema: GenerateTravelSuggestionsInputSchema},
  output: {schema: GenerateTravelSuggestionsOutputSchema},
  prompt: `You are an expert travel advisor and geographer.
Your task is to generate personalized travel information for the given destination based on the user's preferences.
Provide detailed and helpful content for each of the following categories.

Crucially, you must also provide:
1. Plausible geographic coordinates (latitude and longitude as numbers) for the main destination.
2. A list of up to 5 attractive and distinct nearby destinations or points of interest. For each nearby point, provide:
    - Its name.
    - A brief, engaging description.
    - Plausible latitude and longitude as numbers.
    - A URL for a representative photo. If a real photo URL is not known, use a relevant placeholder image from https://placehold.co (e.g., https://placehold.co/300x200.png). If using a placeholder, add a data-ai-hint attribute to the image tag in your mental model for that photo (e.g. for a placeholder image for 'Eiffel Tower', the hint could be 'Eiffel Tower landmark').
    - An overall rating (1-5 stars) if commonly known.

User Preferences:
- Destination: {{{destination}}}
- Interests: {{{interests}}}
- Budget: {{{budget}}}
- Time of Year: {{{timeOfYear}}}

Based on these preferences, generate:
- suggestions: (Overall travel suggestions, what makes this destination special, key highlights)
- activities: (Specific activities, tours, or experiences tailored to the interests)
- placesToStay: (Types of accommodation or specific examples suitable for the budget)
- restaurants: (Dining recommendations, types of cuisine to try)
- destinationCoordinates: (lat, lng for the main destination)
- nearbyAttractions: (Array of objects: {name, description, lat, lng, photoUrl, rating})
`,
});

const generateTravelSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateTravelSuggestionsFlow',
    inputSchema: GenerateTravelSuggestionsInputSchema,
    outputSchema: GenerateTravelSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Ensure nearbyAttractions have placeholder images if photoUrl is missing or invalid
    if (output && output.nearbyAttractions) {
      output.nearbyAttractions.forEach(attraction => {
        if (!attraction.photoUrl || !attraction.photoUrl.startsWith('http')) {
          const hint = attraction.name.split(" ").slice(0,2).join(" ").toLowerCase();
          attraction.photoUrl = `https://placehold.co/300x200.png?text=${encodeURIComponent(attraction.name)}&data-ai-hint=${encodeURIComponent(hint)}`;
        }
      });
    }
    return output!;
  }
);
