import { getUserByClerkID } from '@/lib/auth'
import { prisma } from '@/lib/db'

async function getEntry(id: string) {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
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

  return (
    <main>
      <div className="text-xs italic text-red-600">
        journal entry page {`{ id: ${params.id} }`}
      </div>
      <div>{entry?.content}</div>
    </main>
  )
}
