import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from './ModeToggle'
import Menu from './Menu'

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <Menu />
      <div className="flex items-center gap-4">
        <ModeToggle />
        <UserButton />
      </div>
    </header>
  )
}
