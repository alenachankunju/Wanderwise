'use server';
/**
 * @fileOverview AI agent to decide on relevant travel facts for a destination.
 *
 * - decideTravelFacts - A function that determines the most relevant facts about a destination based on a user query.
 * - DecideTravelFactsInput - The input type for the decideTravelFacts function.
 * - DecideTravelFactsOutput - The return type for the decideTravelFacts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DecideTravelFactsInputSchema = z.object({
  destination: z.string().describe('The destination to get travel facts for.'),
  userQuery: z.string().describe('The user query about the destination.'),
  travelFacts: z.array(z.string()).describe('An array of travel facts about the destination.'),
});
export type DecideTravelFactsInput = z.infer<typeof DecideTravelFactsInputSchema>;

const DecideTravelFactsOutputSchema = z.array(z.string()).describe('An array of the most relevant travel facts.');
export type DecideTravelFactsOutput = z.infer<typeof DecideTravelFactsOutputSchema>;

export async function decideTravelFacts(input: DecideTravelFactsInput): Promise<DecideTravelFactsOutput> {
  return decideTravelFactsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'decideTravelFactsPrompt',
  input: {schema: DecideTravelFactsInputSchema},
  output: {schema: DecideTravelFactsOutputSchema},
  prompt: `You are an expert travel assistant. Your goal is to select the most relevant travel facts about a destination based on a user's query.

Destination: {{{destination}}}
User Query: {{{userQuery}}}

Travel Facts:
{{#each travelFacts}}
- {{{this}}}
{{/each}}

Select the travel facts that are most relevant to the user's query. Return them as a list.

Relevant Travel Facts:`,
});

const decideTravelFactsFlow = ai.defineFlow(
  {
    name: 'decideTravelFactsFlow',
    inputSchema: DecideTravelFactsInputSchema,
    outputSchema: DecideTravelFactsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
