'use client'

import type { Analysis, JournalEntry } from '@prisma/client'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Textarea } from './ui/textarea'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

interface EditorProps {
  entry: JournalEntry & { analysis: Analysis | null }
}

export default function Editor({ entry }: EditorProps) {
  const [currentEditor, setCurrentEditor] = useState<string>(entry.content)
  const [analysis, setAnalysis] = useState<Analysis | null>(entry.analysis)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // const { subject, summary, mood, color, negative } = analysis as Analysis
  // const analysisData = [
  //   { name: 'Subject', value: subject ?? 'a day in the life' },
  //   { name: 'Summary', value: summary ?? '' },
  //   { name: 'Mood', value: mood ?? '' },
  //   { name: 'Color', value: color ?? '#18ffb1' },
  //   { name: 'Negative', value: negative ?? false },
  // ]

  useAutosave({
    data: currentEditor,
    onSave: async (_currentEditor) => {
      setIsLoading(true)
      const data = await updateEntry(entry.id, _currentEditor)
      setIsLoading(false)
    },
  })

  return (
    <div className="grid h-full grid-cols-4">
      <div className="col-span-3">
        {isLoading && (
          <span className="animate-pulse text-sm text-teal-500">
            loading...
          </span>
        )}
        <h2 className="text-lg font-semibold">
          {`Journal Entry ${formatDate(entry)}`}
        </h2>
        <Textarea
          rows={30}
          value={currentEditor}
          onChange={(e) => setCurrentEditor(e.target.value)}
          placeholder="Type..."
          className="bg-white/90 text-neutral-950"
        />
      </div>
      <aside className="ml-2 h-full">
        <h3 className="text-center text-lg font-semibold">Analysis</h3>
        <ul>
          <li className="border-b p-4">
            <Label htmlFor="subject">Subject</Label>
            <Textarea rows={2} id="subject" value={entry.analysis?.subject} />
          </li>
          <li className="border-b p-4">
            <Label htmlFor="summary">Summary</Label>
            <Textarea rows={5} id="summary" value={entry.analysis?.summary} />
          </li>
          <li className="border-b p-4">
            <Label htmlFor="mood">Mood</Label>
            <Input type="text" id="mood" value={entry.analysis?.mood} />
          </li>
          <li className="border-b p-4">
            <Label htmlFor="color">Color</Label>
            <Input type="text" id="color" value={entry.analysis?.color} />
          </li>
          <li className="flex items-center gap-4 border-b p-4">
            <Label htmlFor="negative">Negative</Label>
            <Checkbox
              id="negative"
              checked={entry.analysis?.negative ?? false}
            />
          </li>
        </ul>
      </aside>
    </div>
  )
}
