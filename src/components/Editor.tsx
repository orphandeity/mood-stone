'use client'

import { useState } from 'react'
import { Textarea } from './ui/textarea'
import type { JournalEntry } from '@prisma/client'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/lib/api'
import { spawn } from 'child_process'

export default function Editor({ entry }: { entry: JournalEntry }) {
  const [currentEditor, setCurrentEditor] = useState<string>(
    () => entry.content
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useAutosave({
    data: currentEditor,
    onSave: async (_currentEditor) => {
      setIsLoading(true)
      const data = await updateEntry(entry.id, _currentEditor)
      setIsLoading(false)
    },
  })

  return (
    <div>
      {isLoading && (
        <span className="animate-pulse text-sm text-teal-600">loading...</span>
      )}
      <Textarea
        rows={30}
        value={currentEditor}
        onChange={(e) => setCurrentEditor(e.target.value)}
      />
    </div>
  )
}
