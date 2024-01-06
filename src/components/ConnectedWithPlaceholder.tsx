'use client'

import { useAccount } from 'wagmi'
import nftImage from '../assets/1.png';
import Image from "next/image"

export function ConnectedWithPlaceholder({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()

  if (!isConnected) return <>    
  <section className="nft-display">
    <Image
      src={nftImage}
      alt="SynthwavePunk #1"
      priority
      sizes="100vw"
      style={{
        width: "100%",
        height: "auto",
        objectFit: "contain"
      }} />
  </section></>;
  return <>{children}</>
}