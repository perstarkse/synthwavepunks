'use client';

import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import { synthwavePunkContractConfig } from './contracts';
import Image from "next/image";

export function DisplayMintedNFT({ tokenId} : any) {
  const [nftMetadata, setNftMetadata] = useState<any>(null);

  const { data: tokenUriData } = useContractRead({
    ...synthwavePunkContractConfig,
    functionName: 'tokenURI',
    args: [tokenId],
  });

  useEffect(() => {
    if (tokenUriData) {
      fetch(tokenUriData)
        .then(response => response.json())
        .then(metadata => {
          setNftMetadata(metadata);
        })
        .catch(error => console.error('Error fetching NFT metadata:', error));
    }
  }, [tokenUriData]);

  if (!nftMetadata) {
    return <div>Loading NFT data...</div>;
  }

  return (
    <div className='nft-display'>
    <Image
      src={nftMetadata.image}
      alt={nftMetadata.description}
      height={120}
      width={120}
      priority
      sizes="100vw"
      style={{
        width: "100%",
        height: "auto",
        objectFit: "contain"
      }} />
    <p className='sexy-shadow' style={{marginTop: '1rem', textAlign: 'center', padding: '10px'}}><strong>#{tokenId} </strong>{nftMetadata.description}</p>
    </div>
  );
}