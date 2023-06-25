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
    <div className="grid h-screen w-screen grid-cols-5">
      <aside className="h-full border-r px-2 pt-4">
        <h1 className="text-xl font-bold">moodstone</h1>
        <nav>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Button asChild variant={'link'}>
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="col-span-4 max-h-screen overflow-hidden">
        <header className="flex items-center justify-between border-b px-2 py-4">
          <span className="text-xs italic text-red-600">dashboard layout</span>
          <UserButton afterSignOutUrl="/" />
        </header>
        {children}
      </div>
    </div>
  )
}
