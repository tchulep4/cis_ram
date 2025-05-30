import { useSignInEmailPassword, useUserMfa, useEnableMfa } from '@nhost/nextjs'
import { useState } from 'react'

export default function EnableMfa() {
  const { enableMfa } = useEnableMfa()
  const { isMfaEnabled, qrCodeUrl } = useUserMfa()
  const [done, setDone] = useState(false)

  const handleEnable = async () => {
    const result = await enableMfa()
    if (result.isSuccess) {
      setDone(true)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">MFA - Autenticação em Duas Etapas</h1>
      {!isMfaEnabled && (
        <div>
          <button onClick={handleEnable} className="bg-blue-500 text-white p-2 rounded">Ativar MFA</button>
        </div>
      )}
      {qrCodeUrl && (
        <div>
          <p>Escaneie este QR Code com seu aplicativo autenticador (Google Authenticator, Authy...)</p>
          <img src={qrCodeUrl} alt="QR Code MFA" />
        </div>
      )}
      {done && <p className="text-green-600">✅ MFA ativado com sucesso.</p>}
    </div>
  )
}
