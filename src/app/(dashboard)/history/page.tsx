import HistoryChart from '@/components/HistoryChart'
import { getUserByClerkID } from '@/lib/auth'
import { prisma } from '@/lib/db'

async function getData() {
  const user = await getUserByClerkID()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return { analyses }
}

export default async function HistoryPage() {
  const { analyses } = await getData()
  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)

  return (
    <main>
      <h2 className="mt-8 text-5xl">History</h2>
      {analyses.length > 0 ? (
        <>
          <p className="text-lg font-thin">{`Average Sentiment: ${avg}`}</p>
          <div className="h-[300px]">
            <HistoryChart data={analyses} />
          </div>
        </>
      ) : (
        <p className="text-lg font-thin">you have no journal entries</p>
      )}
    </main>
  )
}
