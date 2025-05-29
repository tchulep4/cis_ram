
import { useQuery, gql } from '@nhost/react-apollo'
import Link from 'next/link'
import { useState } from 'react'
import DashboardCards from '@/components/DashboardCards'
import { useUserId } from '@nhost/nextjs'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

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
      created_by
    }
  }
`

export default function Home() {
  const { data, loading, error } = useQuery(GET_RISKS)
  const userId = useUserId()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const perPage = 5

  if (loading) return <p className="p-4">Carregando...</p>
  if (error) return <p className="p-4 text-red-600">Erro: {error.message}</p>

  const filtered = data?.RiskRegister?.filter((r: any) =>
    r.created_by === userId &&
    (
      r.safeguard_title?.toLowerCase().includes(search.toLowerCase()) ||
      r.asset_class?.toLowerCase().includes(search.toLowerCase()) ||
      r.nist_function?.toLowerCase().includes(search.toLowerCase())
    )
  ) || []

  const pageCount = Math.ceil(filtered.length / perPage)
  const currentItems = filtered.slice(page * perPage, (page + 1) * perPage)

  const chartData = [
    { name: 'IG1', value: filtered.filter((r: any) => r.ig1 >= 4).length },
    { name: 'IG2', value: filtered.filter((r: any) => r.ig2 >= 4).length },
    { name: 'IG3', value: filtered.filter((r: any) => r.ig3 >= 4).length }
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Riscos Registrados</h1>
        <Link href="/add" className="text-blue-600">+ Novo Risco</Link>
      </div>

      <input
        type="text"
        placeholder="Filtrar por título, NIST ou classe"
        className="border p-2 w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <DashboardCards data={filtered} />

      <div className="my-6">
        <h2 className="text-lg font-bold mb-2">Resumo IG por Gráfico</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-4 space-y-4">
        {currentItems.map((risk: any) => (
          <li key={risk.riskid} className="border p-4 rounded">
            <p><strong>{risk.safeguard_title}</strong></p>
            <p>CIS: {risk.cis_safeguard}</p>
            <p>NIST: {risk.nist_function}</p>
            <Link href={`/edit/${risk.riskid}`} className="text-blue-600">Editar</Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6">
        <button
          disabled={page === 0}
          onClick={() => setPage(p => Math.max(0, p - 1))}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {page + 1} de {pageCount}</span>
        <button
          disabled={page + 1 >= pageCount}
          onClick={() => setPage(p => Math.min(p + 1, pageCount - 1))}
          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  )
}
