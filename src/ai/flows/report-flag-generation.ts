'use server';

/**
 * @fileOverview An AI agent for flagging inappropriate user behavior.
 *
 * - generateReportFlags - A function that generates flags for reported user behavior.
 * - ReportFlagsInput - The input type for the generateReportFlags function.
 * - ReportFlagsOutput - The return type for the generateReportFlags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReportFlagsInputSchema = z.object({
  reportText: z.string().describe('The text of the user report.'),
  userProfile: z.string().describe('The user profile of the reported user.'),
});
export type ReportFlagsInput = z.infer<typeof ReportFlagsInputSchema>;

const ReportFlagsOutputSchema = z.object({
  flags: z
    .array(z.string())
    .describe(
      'A list of flags indicating inappropriate behavior, such as harassment, hate speech, or spam.'
    ),
  explanation: z
    .string()
    .describe('A detailed explanation of why the flags were generated.'),
});
export type ReportFlagsOutput = z.infer<typeof ReportFlagsOutputSchema>;

export async function generateReportFlags(input: ReportFlagsInput): Promise<ReportFlagsOutput> {
  return generateReportFlagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reportFlagsPrompt',
  input: {schema: ReportFlagsInputSchema},
  output: {schema: ReportFlagsOutputSchema},
  prompt: `You are an AI moderator tasked with identifying inappropriate behavior in user reports.

  Analyze the following report and user profile to determine if any flags should be raised.

  Report Text: {{{reportText}}}
  User Profile: {{{userProfile}}}

  Generate a list of flags indicating inappropriate behavior and provide a detailed explanation for each flag.
  Possible flags include: harassment, hate speech, spam, inappropriate content, or rule violation.
  If no flags are necessary, return an empty list of flags.
  The explanation should be a detailed justification for the chosen flags, or a statement that no flags were necessary.

  Output should be in JSON format:
  {
    "flags": ["flag1", "flag2", ...],
    "explanation": "Explanation of why these flags were generated."
  }`,
});

const generateReportFlagsFlow = ai.defineFlow(
  {
    name: 'generateReportFlagsFlow',
    inputSchema: ReportFlagsInputSchema,
    outputSchema: ReportFlagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
