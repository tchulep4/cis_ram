
import { useSignInEmailPassword, useAuth } from '@nhost/nextjs'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { signInEmailPassword, isLoading, needsEmailVerification, isSuccess, error } = useSignInEmailPassword()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: any) => {
    e.preventDefault()
    await signInEmailPassword(email, password)
  }

  if (isAuthenticated) {
    router.push('/')
    return null
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-2 w-full rounded">
          Entrar
        </button>
        {error && <p className="text-red-600">{error.message}</p>}
        {needsEmailVerification && <p className="text-yellow-600">Verifique seu e-mail para continuar.</p>}
      </form>
    </div>
  )
}
