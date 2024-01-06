'use client'

import { useAccount, useContractReads } from 'wagmi'

import { proofOfVisitContractConfig, synthwavePunkContractConfig} from './contracts'
import { stringify } from '../utils/stringify'

export function ReadContracts() {
  const { address } = useAccount()

  const { data, isSuccess, isLoading } = useContractReads({
    contracts: [
      {
        ...proofOfVisitContractConfig,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        ...synthwavePunkContractConfig,
        functionName: 'name',
      },
    ],
  })

  return (
    <div>
      <div>Data:</div>
      <div>Address: {address}</div>
      {isLoading && <div>loading...</div>}
      {isSuccess &&
        data?.map((data) => <pre key={stringify(data)}>{stringify(data)}</pre>)}
    </div>
  )
}
