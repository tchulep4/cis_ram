
import { useQuery } from '@nhost/react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'

const GET_RISKS = gql`
  query {
    RiskRegister {
      riskid
      cis_safeguard
      safeguard_title
      asset_class
      nist_function
      ig1
      ig2
      ig3
    }
  }
`

export default function Home() {
  const { data, loading, error } = useQuery(GET_RISKS)
  if (loading) return <p>Carregando...</p>
  if (error) return <p>Erro ao carregar riscos: {error.message}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Riscos Registrados</h1>
      <Link href="/add" className="text-blue-600">+ Novo Risco</Link>
      <ul className="mt-4 space-y-4">
        {data?.RiskRegister?.map((risk: any) => (
          <li key={risk.riskid} className="border p-4 rounded">
            <p><strong>{risk.safeguard_title}</strong></p>
            <p>CIS: {risk.cis_safeguard}</p>
            <p>NIST: {risk.nist_function}</p>
            <Link href={`/edit/${risk.riskid}`} className="text-blue-600">Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
