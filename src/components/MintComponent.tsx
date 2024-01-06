import React, { useEffect, useState } from 'react';
import {  useContractWrite, useWaitForTransaction } from 'wagmi';
import { Notification } from './Notification';
import { hexToNumber } from 'viem';

type MintComponentProps = {
  contractConfig: any; 
  mintButtonLabel: string; 
  onMintSuccess: (tokenId?: number) => void; 
  finalMint?: boolean;
};

export const MintComponent = ({ contractConfig, mintButtonLabel, onMintSuccess, finalMint }: MintComponentProps) => {
  const { write, data } = useContractWrite({...contractConfig, functionName: 'safeMint'});
  const { isLoading, isSuccess, data: transactionData } = useWaitForTransaction({ hash: data?.hash });
  const [showNotification, setShowNotification] = useState(false);
  const [hasMinted, setHasMinted] = useState(false);

  const handleMint = () => {
    setShowNotification(true);
    write();
  };

  useEffect(() => {
    let timeoutId: any;
    if (isSuccess && !hasMinted) {
      timeoutId = setTimeout(() => {
        if (finalMint) { 
          onMintSuccess(hexToNumber(transactionData?.logs[0].topics[3]!));
          setHasMinted(true); 
        } else { 
        onMintSuccess();}
        setHasMinted(true); 
      }, 1000); // Delay in milliseconds
    }
  
    // Clean up the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [isLoading, isSuccess, hasMinted, onMintSuccess]);

  return (
    <>
      {showNotification && <Notification message="Please confirm the transaction in your wallet." />}
      {isLoading && <div className='sexy-color sexy-shadow' style={{marginBottom: '2rem'}}>Minting...</div>}
      {isSuccess && <div className='sexy-color sexy-shadow' style={{marginBottom: '2rem'}}>{mintButtonLabel} Minted!</div>}
      {!isLoading && !isSuccess && <button className='wallet-connect-btn' style={{marginBottom: '2rem'}} onClick={handleMint}>{mintButtonLabel}</button>}
    </>
  );
};

