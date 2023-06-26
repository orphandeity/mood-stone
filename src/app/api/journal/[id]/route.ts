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

  revalidatePath('/journal/[id]')

  return NextResponse.json({ data: updatedEntry })
}
