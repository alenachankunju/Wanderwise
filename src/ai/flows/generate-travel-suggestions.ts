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
      'The interests of the user, such as history, nature, food, or adventure.  Separate multiple interests by commas.'
    ),
  budget: z.string().describe('The budget of the user, such as low, medium, or high.'),
  timeOfYear: z
    .string()
    .describe('The time of year the user is traveling, such as summer, winter, or spring.'),
});
export type GenerateTravelSuggestionsInput = z.infer<typeof GenerateTravelSuggestionsInputSchema>;

const GenerateTravelSuggestionsOutputSchema = z.object({
  suggestions: z.string().describe('The travel suggestions for the destination.'),
  activities: z.string().describe('Potential activities for the destination.'),
  placesToStay: z.string().describe('Potential places to stay for the destination.'),
  restaurants: z.string().describe('Potential restaurants for the destination.'),
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
  prompt: `You are a travel expert.  Generate travel suggestions for the following destination based on the user's preferences.

Destination: {{{destination}}}
Interests: {{{interests}}}
Budget: {{{budget}}}
Time of Year: {{{timeOfYear}}}

Suggestions:
Potential Activities:
Places to Stay:
Restaurants:`,
});

const generateTravelSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateTravelSuggestionsFlow',
    inputSchema: GenerateTravelSuggestionsInputSchema,
    outputSchema: GenerateTravelSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
