
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function PdfButton({ risk }: { risk: any }) {
  const handleExport = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Relatório de Risco', 14, 20)

    autoTable(doc, {
      startY: 30,
      head: [['Campo', 'Valor']],
      body: Object.entries(risk).map(([key, val]) => [key, String(val)])
    })

    doc.save(`Risco-${risk.riskid}.pdf`)
  }

  return (
    <button onClick={handleExport} className="mt-4 bg-indigo-600 text-white px-3 py-1 rounded">
      Exportar PDF
    </button>
  )
}
