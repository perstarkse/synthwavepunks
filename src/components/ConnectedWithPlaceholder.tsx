'use client'

import { useAccount } from 'wagmi'
import nftImage from '../assets/1.png';
import Image from 'next/image'

export function ConnectedWithPlaceholder({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()

  if (!isConnected) return <>    
  <section className="nft-display">
    <Image src={nftImage} alt="SynthwavePunk #1" layout='responsive' objectFit='contain' priority />
  </section></>
  return <>{children}</>
}