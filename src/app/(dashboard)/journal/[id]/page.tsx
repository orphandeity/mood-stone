import Editor from '@/components/Editor'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getUserByClerkID } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { formatDate } from '@/lib/utils'

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

const analysisData = [
  { name: 'Subject' },
  { name: 'Summary' },
  { name: 'Mood' },
  { name: 'Color' },
  { name: 'Negative' },
]

export default async function EntryPage({
  params,
}: {
  params: { id: string }
}) {
  const entry = await getEntry(params.id)

  return (
    <main className="grid h-full grid-cols-4">
      <div className="col-span-3 h-full p-4">
        {entry && (
          <>
            <h2 className="text-lg font-medium">
              {`Journal Entry ${formatDate(entry)}`}
            </h2>
            <Editor entry={entry} />
          </>
        )}
      </div>
      <aside className="h-full border-l">
        <ul>
          <li className="border-b p-4">
            <Label htmlFor="subject">Subject</Label>
            <Textarea rows={2} id="subject" />
          </li>
          <li className="border-b p-4">
            <Label htmlFor="summary">Summary</Label>
            <Textarea rows={5} id="summary" />
          </li>
          <li className="border-b p-4">
            <Label htmlFor="mood">Mood</Label>
            <Input type="text" id="mood" />
          </li>
          <li className="border-b p-4">
            <Label htmlFor="color">Color</Label>
            <Input type="text" id="color" />
          </li>
          <li className="flex items-center gap-4 border-b p-4">
            <Label htmlFor="negative">Negative</Label>
            <Checkbox id="negative" />
          </li>
        </ul>
      </aside>
    </main>
  )
}
