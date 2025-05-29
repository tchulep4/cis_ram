
export default function DashboardCards({ data }: any) {
  const total = data.length || 0
  const ig1 = data.filter((d: any) => d.ig1 >= 4).length
  const ig2 = data.filter((d: any) => d.ig2 >= 4).length
  const ig3 = data.filter((d: any) => d.ig3 >= 4).length

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
      <div className="bg-blue-100 p-4 rounded">Total: <strong>{total}</strong></div>
      <div className="bg-green-100 p-4 rounded">IG1 ≥ 4: <strong>{ig1}</strong></div>
      <div className="bg-yellow-100 p-4 rounded">IG2 ≥ 4: <strong>{ig2}</strong></div>
      <div className="bg-red-100 p-4 rounded">IG3 ≥ 4: <strong>{ig3}</strong></div>
    </div>
  )
}
