import { getUserByClerkID } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'
import Editor from '@/components/Editor'
import EntryAnalysis from '@/components/Analysis'

async function getEntry(id: string) {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

export default async function EntryPage({
  params,
}: {
  params: { id: string }
}) {
  const entry = await getEntry(params.id)

  return entry && entry.analysis ? (
    <main className="h-full">
      <Editor entry={entry} />
    </main>
  ) : null
}
