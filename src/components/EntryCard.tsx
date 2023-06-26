import type { JournalEntry } from '@prisma/client'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card'
import { formatDate } from '@/lib/utils'

export default function EntryCard({ entry }: { entry: JournalEntry }) {
  const date = formatDate(entry)

  return (
    <Card>
      <CardHeader>
        <CardTitle>entry subject</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs italic text-red-600">{entry.id}</p>
      </CardContent>
    </Card>
  )
}
