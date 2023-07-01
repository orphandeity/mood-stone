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
    <Card className="text-sm">
      <CardHeader>
        <CardTitle>{entry.analysis?.subject}</CardTitle>
        <CardDescription className="text-xs">{date}</CardDescription>
      </CardHeader>
      <CardContent className="text-xs">
        <p>{entry.analysis?.summary}</p>
      </CardContent>
    </Card>
  )
}
