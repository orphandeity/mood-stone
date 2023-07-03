import { qa } from '@/lib/ai'
import { getUserByClerkID } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { question } = await request.json()
  const user = await getUserByClerkID()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      createdAt: true,
      content: true,
    },
  })

  const answer = await qa(question, entries)

  return NextResponse.json({ data: answer })
}
