import z from 'zod'
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { LLMChain } from 'langchain/chains'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    subject: z.string().describe('the subject of the journal entry'),
    summary: z.string().describe('quick summary of the entire journal entry'),
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry'),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry, e.g. #0101fe for blue representing happiness'
      ),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? i.e., does it contain negative emotions?'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text rated on a scale from -10 to 10 where -10 is extremely negative, 0 is neutral and 10 is extremely positive'
      ),
  })
)

async function getPrompt(content: string) {
  const template =
    'Analyze the following journal entry.  Follow the instructions and format the response to match the format instructions, no matter what!\n{format_instructions}\n{entry}'
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template,
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })
  const input = await prompt.format({
    entry: content,
  })

  return input
}

export async function analyze(content: string) {
  const input = await getPrompt(content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const result = await model.call(input)

  try {
    return parser.parse(result)
  } catch (error) {
    throw new Error('something went wrong')
  }
}
