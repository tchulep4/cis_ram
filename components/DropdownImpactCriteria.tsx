
import { gql, useQuery } from '@nhost/react-apollo'

const GET_IMPACT_CRITERIA = gql`
  query {
    legend_impact_criteria(order_by: {criteria_name: asc}) {
      id
      criteria_name
    }
  }
`

export default function DropdownImpactCriteria({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const { data, loading, error } = useQuery(GET_IMPACT_CRITERIA)

  if (loading) return <select disabled><option>Carregando...</option></select>
  if (error) return <select disabled><option>Erro ao carregar</option></select>

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="border rounded p-2 w-full">
      <option value="">Selecione um critério</option>
      {data.legend_impact_criteria.map((i: any) => (
        <option key={i.id} value={i.criteria_name}>{i.criteria_name}</option>
      ))}
    </select>
  )
}
