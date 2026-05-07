'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg border-b-4 border-blue-500">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <Link href="/">
          <h1 className="text-2xl font-bold mb-1">Making Tax Digital Explained</h1>
          <p className="text-xs text-slate-400">No jargon. No panic. (April 2026)</p>
        </Link>
      </nav>
    </header>
  )
}
