import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import Header from '@/components/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  )
}
