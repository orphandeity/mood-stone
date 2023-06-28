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
      <aside className="h-full space-y-16">
        <div className="ml-2 flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
          <h1 className="text-center text-xl font-bold underline">moodstone</h1>
        </div>
        <nav>
          <ul className="flex flex-col items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Button
                  asChild
                  variant={'ghost'}
                  size={'lg'}
                  className="w-full "
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="col-span-4 max-h-screen overflow-hidden">{children}</div>
    </div>
  )
}
