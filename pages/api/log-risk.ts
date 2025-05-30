
import { nhost } from '@/lib/nhost'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { riskid, user_id, action_type } = req.body

  try {
    const result = await nhost.graphql.request(`
      mutation {
        insert_risk_audit_log_one(object: {
          riskid: "${riskid}",
          user_id: "${user_id}",
          action_type: "${action_type}"
        }) {
          id
        }
      }
    `)
    res.status(200).json({ success: true, result })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
