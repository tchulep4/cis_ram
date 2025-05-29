
import Link from 'next/link'
import { useAuth, useSignOut } from '@nhost/nextjs'

export default function Layout({ children }: any) {
  const { isAuthenticated } = useAuth()
  const { signOut } = useSignOut()

  return (
    <div>
      <header className="bg-gray-100 p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">CIS RAM</h1>
        <nav className="space-x-4">
          <Link href="/">Home</Link>
          {isAuthenticated && <Link href="/add">Novo</Link>}
          {!isAuthenticated ? (
            <Link href="/login">Login</Link>
          ) : (
            <button onClick={signOut} className="text-red-600">Sair</button>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
