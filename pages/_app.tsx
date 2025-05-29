
import '@/styles/globals.css'
import { NhostNextProvider } from '@nhost/nextjs'
import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  subdomain: process.env.NHOST_SUBDOMAIN || '',
  region: process.env.NHOST_REGION || ''
})

export default function App({ Component, pageProps }: any) {
  return (
    <NhostNextProvider nhost={nhost}>
      <Component {...pageProps} />
    </NhostNextProvider>
  )
}
