'use client'

import { useNetwork, useSwitchNetwork } from 'wagmi'

export function NetworkSwitcher() {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  return (
    <div className='network-chooser'>
      <div className='network-info'>
        Connected to <span className='sexy-color'>{chain?.name ?? chain?.id}</span>
        {chain?.unsupported && ' (unsupported)'}
      </div>
      <br />
      {switchNetwork && !chains.length &&(
        <div style={{ marginLeft: '0.5rem'}} className='network-info network-buttons'>
          Switch to:{' '}
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <button className='wallet-connect-btn' key={x.id} onClick={() => switchNetwork(x.id)}>
                {x.name}
                {isLoading && x.id === pendingChainId && ' (switching)'}
              </button>
            ),
          )}
        </div>
      )}

      <div>{error?.message}</div>
    </div>
  )
}
