// This is a server-side file.
'use server';

/**
 * @fileOverview Provides personalized product recommendations based on user history.
 *
 * - getSmartProductRecommendations - A function that retrieves smart product recommendations for a user.
 * - SmartProductRecommendationsInput - The input type for the getSmartProductRecommendations function.
 * - SmartProductRecommendationsOutput - The return type for the getSmartProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartProductRecommendationsInputSchema = z.object({
  userHistory: z.string().describe('The user history of browsing and purchase behavior.'),
});
export type SmartProductRecommendationsInput = z.infer<typeof SmartProductRecommendationsInputSchema>;

const SmartProductRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.string().describe('Recommended product names based on user history.')
  ).describe('A list of recommended product names.')
});
export type SmartProductRecommendationsOutput = z.infer<typeof SmartProductRecommendationsOutputSchema>;

export async function getSmartProductRecommendations(input: SmartProductRecommendationsInput): Promise<SmartProductRecommendationsOutput> {
  return smartProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartProductRecommendationsPrompt',
  input: {schema: SmartProductRecommendationsInputSchema},
  output: {schema: SmartProductRecommendationsOutputSchema},
  prompt: `You are an expert e-commerce product recommender.

  Based on the user's history, provide a list of product recommendations.

  User History: {{{userHistory}}}

  Recommendations:`,
});

const smartProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'smartProductRecommendationsFlow',
    inputSchema: SmartProductRecommendationsInputSchema,
    outputSchema: SmartProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
