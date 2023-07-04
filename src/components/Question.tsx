'use client'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { useState } from 'react'
import { askQuestion } from '@/lib/api'
import LoadingSpinner from './LoadingSpinner'

export default function Question() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const response = await askQuestion(question)

    setAnswer(response)
    setQuestion('')
    setLoading(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          disabled={loading}
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button variant={'outline'} type="submit" disabled={loading}>
          Ask
        </Button>
      </form>
      {loading && <LoadingSpinner />}
      {answer && <div className="mt-4 text-sm italic">{answer}</div>}
    </>
  )
}
