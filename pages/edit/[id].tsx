import FileUploader from '@/components/FileUploader'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { nhost } from '../../lib/nhost'

export default function EditRisk() {
  const router = useRouter()
  const { id } = router.query
  const [form, setForm] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    nhost.graphql.request(`
      query {
        RiskRegister_by_pk(riskid: "${id}") {
          riskid, cis_safeguard, safeguard_title, asset_class, nist_function, ig1, ig2, ig3
        }
      }
    `).then(({ data }) => setForm(data?.RiskRegister_by_pk))
  }, [id])

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { error } = await nhost.graphql.request(`
      mutation {
        update_RiskRegister_by_pk(pk_columns: { riskid: "${id}" }, _set: {
          cis_safeguard: "${form.cis_safeguard}",
          safeguard_title: "${form.safeguard_title}",
          asset_class: "${form.asset_class}",
          nist_function: "${form.nist_function}",
          ig1: ${form.ig1}, ig2: ${form.ig2}, ig3: ${form.ig3}
        }) {
          riskid
        }
      }
    `)
    if (error) setError(error.message)
    else window.location.href = '/'
  }

  if (!form) return <p>Carregando...</p>

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Editar Risco</h1>
      {['cis_safeguard', 'safeguard_title', 'asset_class', 'nist_function'].map(field => (
        <input key={field} required name={field} value={form[field]} onChange={handleChange} className="border p-2 w-full" />
      ))}
      {['ig1', 'ig2', 'ig3'].map(field => (
        <input key={field} required type="number" min="1" max="5" name={field} value={form[field]} onChange={handleChange} className="border p-2 w-full" />
      ))}
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Atualizar</button>
      <FileUploader riskid={id as string} />
    </form>
  )
}
