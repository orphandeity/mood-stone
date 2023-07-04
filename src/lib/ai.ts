import z from 'zod'
import type { JournalEntry } from '@prisma/client'
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { Document } from 'langchain/document'
import { LLMChain, RetrievalQAChain, loadQARefineChain } from 'langchain/chains'
import { HNSWLib } from 'langchain/vectorstores/hnswlib'
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
    throw new Error('there was an error parsing the analysis')
  }
}

export async function qa(
  question: string,
  entries: Pick<JournalEntry, 'id' | 'createdAt' | 'content'>[]
): Promise<string> {
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const embeddings = new OpenAIEmbeddings()

  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry.id, createdAt: entry.createdAt },
    })
  })

  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)

  const chain = new RetrievalQAChain({
    combineDocumentsChain: loadQARefineChain(model),
    retriever: store.asRetriever(),
    inputKey: 'question',
  })

  const res = await chain.call({ question })

  return res.output_text
}
