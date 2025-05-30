
import { gql, useQuery } from '@nhost/react-apollo'

const GET_ASSET_CLASSES = gql`
  query {
    assetclasses(order_by: {name: asc}) {
      id
      name
    }
  }
`

export default function DropdownAssetClass({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const { data, loading, error } = useQuery(GET_ASSET_CLASSES)

  if (loading) return <select disabled><option>Carregando...</option></select>
  if (error) return <select disabled><option>Erro ao carregar</option></select>

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="border rounded p-2 w-full">
      <option value="">Selecione uma classe</option>
      {data.assetclasses.map((a: any) => (
        <option key={a.id} value={a.name}>{a.name}</option>
      ))}
    </select>
  )
}
