import { useResetPassword } from '@nhost/nextjs'
import { useState } from 'react'

export default function ResetPassword() {
  const { resetPassword } = useResetPassword()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await resetPassword(email)
    if (result.isSuccess) {
      setStatus('Verifique seu e-mail para redefinir sua senha.')
    } else {
      setStatus('Erro ao enviar solicitação de redefinição.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold">Redefinir Senha</h1>
      <input
        type="email"
        required
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full my-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Enviar link</button>
      {status && <p className="mt-2">{status}</p>}
    </form>
  )
}
