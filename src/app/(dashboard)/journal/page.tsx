import { getUserByClerkID } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import EntryCard from '@/components/EntryCard'
import NewEntry from '@/components/NewEntry'

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
    <main className="h-full space-y-8">
      <NewEntry />
      <div className="grid grid-cols-4 gap-2">
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </main>
  )
}
