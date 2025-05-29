
import { useAuth } from '@nhost/nextjs'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function ProtectedRoute({ children }: any) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated])

  if (!isAuthenticated) {
    return <p className="p-6">Verificando autenticação...</p>
  }

  return children
}
