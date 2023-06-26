import { Button } from '@/components/ui/button'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default function Home() {
  const { userId } = auth()
  let href = userId ? '/journal' : '/new-user'

  return (
    <main className="grid min-h-screen place-content-center">
      <div className="max-w-fit space-y-8">
        <div>
          <h1 className="text-6xl font-bold tracking-tight">moodstone</h1>
          <p className="text-lg font-medium">
            a journal app that reflects your mood
          </p>
        </div>
        <Button asChild size={'lg'} className="w-full text-lg">
          <Link href={href}>get started</Link>
        </Button>
      </div>
    </main>
  )
}
