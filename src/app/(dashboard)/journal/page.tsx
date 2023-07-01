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
      include: {
        analysis: true,
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
    <main className="flex h-full flex-col">
      <div className="grid place-content-center py-40">
        <NewEntry />
      </div>
      <div>
        <h2 className="text-xs font-semibold uppercase opacity-75">
          Past Journal Entries:
        </h2>
        <ul className="mt-4 space-y-4">
          {entries.map((entry) => (
            <li key={entry.id}>
              <Link href={`/journal/${entry.id}`}>
                <EntryCard entry={entry} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
