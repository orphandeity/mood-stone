import { getUserByClerkID } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import Question from '@/components/Question'
import NewEntry from '@/components/NewEntry'
import EntryCard from '@/components/EntryCard'
import CurrentDate from '@/components/CurrentDate'

async function getData() {
  const user = await getUserByClerkID()
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

  return { entries }
}

export default async function JournalPage() {
  const { entries } = await getData()

  return (
    <main className="flex h-full flex-col gap-4">
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="flex aspect-square flex-col gap-8">
          <div>
            <h2 className="text-5xl">Journal</h2>
            <CurrentDate />
          </div>
          <NewEntry />
        </div>
        <div className="flex aspect-square flex-col justify-end gap-4 rounded-xl bg-secondary p-2">
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
