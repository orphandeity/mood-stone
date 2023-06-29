import { analyze } from '@/lib/ai'
import { getUserByClerkID } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!',
    },
  })

  const analysisResponse = await analyze(entry.content)

  if (analysisResponse) {
    await prisma.analysis.create({
      data: {
        userId: user.id,
        entryId: entry.id,
        ...analysisResponse,
      },
    })
  }

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
