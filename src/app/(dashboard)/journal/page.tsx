import EntryCard from '@/components/EntryCard'
import NewEntry from '@/components/NewEntry'
import { getUserByClerkID } from '@/lib/auth'
import { prisma } from '@/lib/db'

async function getEntries() {
  const user = await getUserByClerkID()
  if (user) {
    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return entries
  } else {
    // this will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
}

export default async function JournalPage() {
  const entries = await getEntries()
  return (
    <main className="h-full bg-secondary p-4">
      <div className="text-xs italic text-red-600">journal page</div>
      <NewEntry />
      <div className="flex flex-wrap gap-4">
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </main>
  )
}
