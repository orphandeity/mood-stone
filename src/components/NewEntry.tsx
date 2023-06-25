'use client'

import { createNewEntry } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export default function NewEntry() {
  const router = useRouter()

  async function handleClick() {
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }

  return <Button onClick={handleClick}>new journal entry</Button>
}
