import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import { useNoopContract } from './hooks/useNoopContract';

function App() {
    const { connected } = useTonConnect();
    const { owner, address, sendRefill, sendWithdraw } = useNoopContract();

    return (
        <div className='App'>
            <div className='Container'>
                <TonConnectButton />

                <div className='Card'>
                    <b>Contract Address</b>
                    <div className='Hint'>{address ? `${address.slice(0, 4)}...${address.slice(-4)}` : 'Loading...'}</div>
                </div>

                <div className='Card'>
                    <b>Owner Address</b>
                    <div className='Hint'>{owner ? `${owner.slice(0, 4)}...${owner.slice(-4)}` : 'Loading...'}</div>
                </div>

                <a
                    className={`Button ${connected ? 'Active' : 'Disabled'}`}
                    onClick={() => {
                        sendRefill();
                    }}
                >
                    Refill
                </a>
                <a
                    className={`Button ${connected ? 'Active' : 'Disabled'}`}
                    onClick={() => {
                        sendWithdraw();
                    }}
                >
                    Withdraw
                </a>
            </div>
        </div>
    );
}

export default App
