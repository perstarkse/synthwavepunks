'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useConfig } from 'wagmi';
import { MintProcess } from './MintProcess';
import { synthwavePunkContractConfig } from './contracts';
import { hexToNumber, parseAbiItem } from 'viem';
import { DisplayMintedNFT } from './DisplayMintedNFT';
import nftImage from '../assets/1.png';
import Image from "next/image"

export function NFTUserJourneyManager() {
  const { address } = useAccount();
  const [userTokenId, setUserTokenId] = useState(null);
  const config = useConfig();

  useEffect(() => {
    const fetchLogs = async () => {
      if (address) {
        const logs = await config.getPublicClient().getLogs({
          address: synthwavePunkContractConfig.address,
          fromBlock: BigInt(37580145),
          toBlock: 'latest',
          event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
          args: { to: address } as any,
        });

        if (logs.length > 0) {
          const tokenId = hexToNumber(logs[logs.length - 1].topics[3 as any] as any);
          setUserTokenId(tokenId as any);
          }
      }
    };

    fetchLogs();
  }, [address, config]);

  const userHasFinished = (tokenId: number) => {
    setUserTokenId(tokenId as any);
  }

  if (userTokenId !== null) {
    return <DisplayMintedNFT tokenId={userTokenId} />;
  } else {
    return <>
    <MintProcess userHasFinished={userHasFinished} />
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
    </section>
    </>;
  }
}