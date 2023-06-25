import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>home page</h1>
      <Button asChild>
        <Link href={'/journal'}>journal</Link>
      </Button>
    </main>
  )
}
