import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const links = [
  { href: '/', label: 'home' },
  { href: '/journal', label: 'journal' },
  { href: '/history', label: 'history' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid h-screen w-screen grid-cols-5 gap-2 p-4">
      <aside className="h-full space-y-16 px-2">
        <h1 className="text-center text-2xl font-bold">moodstone</h1>
        <nav>
          <ul className="flex flex-col items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Button asChild variant={'link'} size={'lg'}>
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <menu className="flex items-center justify-center gap-4 rounded-md border border-border p-4 shadow-inner">
          <UserButton />
          <ModeToggle />
        </menu>
      </aside>
      <div className="col-span-4 max-h-screen overflow-hidden">{children}</div>
    </div>
  )
}
