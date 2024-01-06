import { Account } from '../components/Account'
import { Connect } from '../components/Connect'
import { Connected } from '../components/Connected'
import { NetworkSwitcher } from '../components/NetworkSwitcher'


import '../app/styles.css'
import { NFTUserJourneyManager } from '../components/NFTUserJourneyManager'
import MyFooter from '../components/Footer'
import { CTAComponent } from '../components/CTA'
import { ConnectedWithPlaceholder } from '../components/ConnectedWithPlaceholder'
import LoadingSpinner from '../components/LoadingSpinner'


export default function Page() {

  return (
    <div className='container'>
      <header className='topbar'>
        <Connect />
        <Connected>
          <NetworkSwitcher />
        </Connected>
      </header>
      <main>
        <LoadingSpinner />
        <h1 className='center-title'>SynthwavePunks</h1>
        <section className="info-segment">
        <p>Welcome to the <strong className='sexy-color'>evolution of digital artistry</strong>, where the echoes of the past meet the vision of the present. Hailing from my now deprecated personal website, this NFT collection now stands proudly in its own right.</p>
        <p>Crafted with pioneering stable-diffusion v1.5 tech in 2022, each piece is a snapshot of an era. These are more than mere images; they're <em className="sexy-shadow">whispers of technological strides</em>.</p>
        <p>Embark on an exclusive odyssey with 90 unique NFTs, yours to claim on the Polygon Mainnet without cost. Each piece is not just a token—it's a passage through the annals of digital creativity. In need of tokens to transact? <em className="sexy-color">Please contact and I'll assist</em>.</p>
          <CTAComponent />
        </section>
        <ConnectedWithPlaceholder>
          <NFTUserJourneyManager />
        </ConnectedWithPlaceholder>
      </main>
      <footer>
        <MyFooter />
      </footer>
    </div>
  );
}
