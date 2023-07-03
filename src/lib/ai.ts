import z from 'zod'
import type { JournalEntry } from '@prisma/client'
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { Document } from 'langchain/document'
import { LLMChain, loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

const analysisParser = StructuredOutputParser.fromZodSchema(
  z.object({
    subject: z
      .string()
      .describe('the subject of the journal entry expressed in two words'),
    summary: z.string().describe('quick summary of the entire entry'),
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
        'is the journal entry negative? (i.e. does it contain negative emotions?)'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text rated on a scale from -10 to 10 where -10 is extremely negative, 0 is neutral and 10 is extremely positive'
      ),
  })
)

async function analysisPrompt(content: string) {
  const format_instructions = analysisParser.getFormatInstructions()
  const template =
    'Analyze the following journal entry.  Follow the instructions and format the response to match the format instructions, no matter what!\n{format_instructions}\n{entry}'

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
  const input = await analysisPrompt(content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const result = await model.call(input)

  try {
    return analysisParser.parse(result)
  } catch (error) {
    throw new Error('something went wrong')
  }
}

export async function qa(
  question: string,
  entries: Pick<JournalEntry, 'id' | 'createdAt' | 'content'>[]
): Promise<string> {
  // Create the models and chain
  const embeddings = new OpenAIEmbeddings()
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const chain = loadQARefineChain(model)

  // Create the documents and the vector store
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    })
  })
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)

  // Select the relevant documents
  const relevantDocs = await store.similaritySearch(question)

  // Call the chain
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}
