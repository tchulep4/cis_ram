
import { useStorageUpload } from '@nhost/react'
import { useState } from 'react'

export default function FileUploader({ riskid }: { riskid: string }) {
  const [file, setFile] = useState<File | null>(null)
  const { upload, isUploading } = useStorageUpload()

  const handleUpload = async () => {
    if (!file) return
    const result = await upload({ file, fileOptions: { metadata: { riskid } } })
    alert(result?.[0]?.fileMetadata?.id ? "Upload realizado!" : "Erro ao subir arquivo")
  }

  return (
    <div className="mt-4">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} disabled={isUploading || !file}
        className="ml-2 px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50">
        {isUploading ? 'Enviando...' : 'Upload'}
      </button>
    </div>
  )
}
