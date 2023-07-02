'use client'

import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import EntryAnalysis from './Analysis'
import { Loader2 } from 'lucide-react'
import type { Analysis, JournalEntry } from '@prisma/client'

interface EditorProps {
  entry: JournalEntry & { analysis: Analysis | null }
}

export default function Editor({ entry }: EditorProps) {
  const [currentEditor, setCurrentEditor] = useState<string>(entry.content)
  const [analysis, setAnalysis] = useState(entry.analysis as Analysis)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useAutosave({
    data: currentEditor,
    onSave: async (_currentEditor) => {
      setIsLoading(true)
      const data = await updateEntry(entry.id, _currentEditor)
      setAnalysis(data.analysis)
      setIsLoading(false)
    },
  })

  const Loading = () => (
    <div className="absolute bottom-4 right-4 animate-spin text-emerald-400/75">
      <Loader2 />
    </div>
  )

  return (
    <div className="mt-4 h-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">{analysis.subject}</h2>
          </div>
          <p className="text-xs opacity-75">{formatDate(entry)}</p>
        </div>
        <EntryAnalysis analysis={analysis} />
      </div>

      <div className="relative">
        <Textarea
          rows={30}
          value={currentEditor}
          onChange={(e) => setCurrentEditor(e.target.value)}
          placeholder="Type..."
          className="bg-white/90 text-neutral-950"
        />
        {isLoading && <Loading />}
      </div>
    </div>
  )
}
