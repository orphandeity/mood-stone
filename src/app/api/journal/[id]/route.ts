import { analyze } from '@/lib/ai'
import { getUserByClerkID } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { content } = await req.json()
  const user = await getUserByClerkID()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  const analysisResponse = await analyze(updatedEntry.content)

  const analysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...analysisResponse,
    },
    update: analysisResponse,
  })

  revalidatePath('/journal/[id]')

  return NextResponse.json({ data: { ...updatedEntry, analysis } })
}
