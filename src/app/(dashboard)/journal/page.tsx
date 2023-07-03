import { getUserByClerkID } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import EntryCard from '@/components/EntryCard'
import NewEntry from '@/components/NewEntry'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Question from '@/components/Question'

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
      <div className="my-8 grid gap-4 sm:grid-cols-2">
        <div className="grid aspect-square place-content-center rounded-xl border border-border">
          <NewEntry />
        </div>
        <div className="aspect-square">
          <Question />
        </div>
      </div>
      <div>
        <h2 className="text-xs font-semibold uppercase opacity-75">
          Past Journal Entries:
        </h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
