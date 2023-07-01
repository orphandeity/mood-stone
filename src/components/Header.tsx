'use client'

import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from './ModeToggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Menu } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' },
]

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">moonstone</h1>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2">
            <nav>
              <ul>
                {links.map((link) => (
                  <li key={link.href}>
                    <DropdownMenuItem>
                      <Link href={link.href}>{link.label}</Link>
                    </DropdownMenuItem>
                  </li>
                ))}
              </ul>
            </nav>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
