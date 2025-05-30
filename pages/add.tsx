import DropdownAssetClass from '@/components/DropdownAssetClass'
import DropdownImpactCriteria from '@/components/DropdownImpactCriteria'
import { useState } from 'react'
import { nhost } from '../lib/nhost'

export default function AddRisk() {
  const [form, setForm] = useState({
    riskid: '', cis_safeguard: '', safeguard_title: '', asset_class: '',
    nist_function: '', ig1: 1, ig2: 1, ig3: 1
  })
  const [error, setError] = useState('')
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { error } = await nhost.graphql.request(`
      mutation {
        insert_RiskRegister_one(object: {
          riskid: "${form.riskid}",
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

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Novo Risco</h1>
      <input
  required
  name="riskid"
  placeholder="riskid"
  onChange={handleChange}
  className="border p-2 w-full"
/>
<input
  required
  name="cis_safeguard"
  placeholder="cis_safeguard"
  onChange={handleChange}
  className="border p-2 w-full"
/>
<input
  required
  name="safeguard_title"
  placeholder="safeguard_title"
  onChange={handleChange}
  className="border p-2 w-full"
/>

<DropdownAssetClass
  value={form.asset_class}
  onChange={(val) => setForm({ ...form, asset_class: val })}
/>

<input
  required
  name="nist_function"
  placeholder="nist_function"
  onChange={handleChange}
  className="border p-2 w-full"
/>

      {['ig1', 'ig2', 'ig3'].map(field => (
        <input key={field} required type="number" min="1" max="5" name={field} placeholder={field} onChange={handleChange} className="border p-2 w-full" />
      ))}
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Salvar</button>
    </form>
  )
}
