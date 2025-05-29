
import { useQuery } from '@nhost/react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useState } from 'react'
import DashboardCards from '@/components/DashboardCards'

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
  const [search, setSearch] = useState('')

  if (loading) return <p className="p-4">Carregando...</p>
  if (error) return <p className="p-4 text-red-600">Erro: {error.message}</p>

  const filtered = data?.RiskRegister?.filter((r: any) =>
    r.safeguard_title?.toLowerCase().includes(search.toLowerCase()) ||
    r.asset_class?.toLowerCase().includes(search.toLowerCase()) ||
    r.nist_function?.toLowerCase().includes(search.toLowerCase())
  ) || []

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Riscos Registrados</h1>
        <Link href="/add" className="text-blue-600">+ Novo Risco</Link>
      </div>
      <input
        type="text"
        placeholder="Filtrar por título, função NIST ou classe de ativo"
        className="border p-2 w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DashboardCards data={filtered} />
      <ul className="mt-4 space-y-4">
        {filtered.map((risk: any) => (
          <li key={risk.riskid} className="border p-4 rounded">
            <p><strong>{risk.safeguard_title}</strong></p>
            <p>CIS: {risk.cis_safeguard}</p>
            <p>NIST: {risk.nist_function}</p>
            <Link href={`/edit/${risk.riskid}`} className="text-blue-600">Editar</Link>
          </li>
        ))}
      </ul>
      <a
        href={`data:text/csv;charset=utf-8,${encodeURIComponent(
          'ID,Título,CIS,NIST,Classe,IG1,IG2,IG3\n' +
          filtered.map((r: any) =>
            [r.riskid, r.safeguard_title, r.cis_safeguard, r.nist_function, r.asset_class, r.ig1, r.ig2, r.ig3].join(',')
          ).join('\n')
        )}`}
        download="risks.csv"
        className="mt-6 inline-block bg-gray-200 p-2 rounded text-sm"
      >
        Exportar CSV
      </a>
    </div>
  )
}
