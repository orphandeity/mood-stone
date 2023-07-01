'use client'

import type { Analysis, JournalEntry } from '@prisma/client'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import EntryAnalysis from './Analysis'

interface EditorProps {
  entry: JournalEntry & { analysis: Analysis | null }
}

export default function Editor({ entry }: EditorProps) {
  const [currentEditor, setCurrentEditor] = useState<string>(entry.content)
  const [analysis, setAnalysis] = useState<Analysis | null>(entry.analysis)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useAutosave({
    data: currentEditor,
    onSave: async (_currentEditor) => {
      setIsLoading(true)
      const data = await updateEntry(entry.id, _currentEditor)
      setIsLoading(false)
    },
  })

  const Loading = () => (
    <div className="h-4 w-4 animate-pulse rounded-full bg-teal-500 opacity-75" />
  )

  return (
    <div className="mt-4 h-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">{entry.analysis?.subject}</h2>
            {isLoading && <Loading />}
          </div>
          <p className="text-xs opacity-75">{formatDate(entry)}</p>
        </div>
        <EntryAnalysis analysis={analysis} />
      </div>
      <Textarea
        rows={30}
        value={currentEditor}
        onChange={(e) => setCurrentEditor(e.target.value)}
        placeholder="Type..."
        className="bg-white/90 text-neutral-950"
      />
    </div>
  )
}
