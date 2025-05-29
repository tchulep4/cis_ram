
import { useQuery, gql } from '@nhost/react-apollo'
import { useUserData } from '@nhost/nextjs'
import ProtectedRoute from '@/components/ProtectedRoute'

const GET_ALL = gql`
  query {
    users {
      id
      email
      displayName
    }
    RiskRegister {
      riskid
      safeguard_title
      created_by
    }
  }
`

export default function AdminPage() {
  const { data, loading, error } = useQuery(GET_ALL)
  const user = useUserData()

  if (!user || user?.roles?.indexOf('admin') === -1) return <p className="p-4">Acesso negado</p>
  if (loading) return <p className="p-4">Carregando...</p>
  if (error) return <p className="p-4 text-red-600">Erro: {error.message}</p>

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Painel de Administração</h1>
        <h2 className="font-bold">Usuários:</h2>
        <ul className="mb-6">
          {data.users.map((u: any) => (
            <li key={u.id}>📧 {u.email} — {u.displayName || 'sem nome'}</li>
          ))}
        </ul>
        <h2 className="font-bold">Riscos:</h2>
        <ul>
          {data.RiskRegister.map((r: any) => (
            <li key={r.riskid}>🛡️ {r.safeguard_title} — Criado por {r.created_by}</li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  )
}
