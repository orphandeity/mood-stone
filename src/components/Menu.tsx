'use client'

import { ChevronDown } from 'lucide-react'
import { Button } from './ui/button'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'
import { NavigationMenuLink } from '@radix-ui/react-navigation-menu'

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' },
]

export default function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <h1 className="text-xl font-bold">moodstone</h1>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <nav className="w-[159px] p-6">
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </nav>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
