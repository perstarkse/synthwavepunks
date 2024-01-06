'use client'

import { useAccount } from 'wagmi'

export function CTAComponent() {
  const { isConnected } = useAccount()

  if (!isConnected) return <><p><span className='sexy-shadow sexy-color'>Connect and get started!</span></p>
  </>
  return null
}
