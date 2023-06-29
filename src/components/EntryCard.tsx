import type { Analysis, JournalEntry } from '@prisma/client'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card'
import { formatDate } from '@/lib/utils'

interface EntryCardProps {
  entry: JournalEntry & { analysis: Analysis | null }
}

export default function EntryCard({ entry }: EntryCardProps) {
  const date = formatDate(entry)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{entry.analysis?.subject}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{entry.analysis?.summary}</p>
      </CardContent>
    </Card>
  )
}
