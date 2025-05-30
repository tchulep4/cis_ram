
import { useUserData } from '@nhost/nextjs'

export default function RoleGuard({ role, children }: { role: string, children: any }) {
  const user = useUserData()
  if (!user?.roles?.includes(role)) return null
  return children
}
