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
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          disabled={loading}
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button
          variant={'secondary'}
          size={'default'}
          type="submit"
          disabled={loading}
          className="w-full"
        >
          ask
        </Button>
      </form>
      {loading && <LoadingSpinner />}
      {answer && <div className="mt-4 text-xs italic">{answer}</div>}
    </>
  )
}