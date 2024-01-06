'use client'

import { useAccount, useContractReads } from 'wagmi'
import { proofOfVisitContractConfig, synthwavePunkContractConfig} from './contracts'
import { MintComponent } from './MintComponent'

interface MintProcessProps {
    userHasFinished: (tokenId: number) => void;
}

export function MintProcess({ userHasFinished }: MintProcessProps) {
  const { address } = useAccount()

  const { data, isSuccess, isLoading, refetch } = useContractReads({
    contracts: [
      {
        ...proofOfVisitContractConfig,
        functionName: 'hasClaimed',
        args: [address!],
      },
      {
        ...synthwavePunkContractConfig,
        functionName: 'hasClaimed',
        args: [address!],
      },
    ],
  })

  const handleRefreshStatus = (tokenId?: number) => {
    if (tokenId) { 
        userHasFinished(tokenId);
    } else { 
        refetch();
    }
  };

  const mintedProofOfVisit = isSuccess ? data![0].result : false;
  const mintedSynthwavePunk = isSuccess ? data![1].result: false;

  const canMintProofOfVisit = isSuccess && !isLoading && !mintedProofOfVisit;
  const canMintSynthwavePunk = isSuccess && !isLoading && !mintedSynthwavePunk && mintedProofOfVisit;

  return (
    <div>
      {isLoading && <div>loading...</div>}
      {isSuccess && (
        <>
          {canMintProofOfVisit && (
        <MintComponent
          contractConfig={proofOfVisitContractConfig}
          mintButtonLabel="Mint Proof of Visit Token"
          onMintSuccess={handleRefreshStatus}
        />
      )}
      {canMintSynthwavePunk && (
        <MintComponent
          contractConfig={synthwavePunkContractConfig}
          mintButtonLabel="Mint Synthwave Punk"
          onMintSuccess={handleRefreshStatus}
          finalMint={true}
        />
      )}
        </>
      )}
    </div>
  );
}

