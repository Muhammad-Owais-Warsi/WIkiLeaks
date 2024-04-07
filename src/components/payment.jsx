import { useEffect, useState } from 'react';
import Web3 from 'web3';

// Import the ABI of the smart contract
import paymentsABI from './paymentsABI.json';

// Address of the deployed smart contract
const contractAddress = "0x8b772CD0F148B3c969FA9e2D2a5fC9c70b1Bc958";

export default function App() {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [payer, setPayer] = useState('');
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if MetaMask is installed
        if (window.ethereum) {
            // Initialize Web3 with the current provider
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);

            // Create a contract instance
            const contractInstance = new web3Instance.eth.Contract(paymentsABI, contractAddress);
            setContract(contractInstance);

            // Fetch the payer's wallet address automatically
            const fetchPayerAddress = async () => {
                try {
                    // Get the list of accounts from MetaMask
                    const accounts = await web3Instance.eth.getAccounts();
                    // Set the first account as the payer's address
                    setPayer(accounts[0]);
                } catch (error) {
                    // Handle error
                    setError(error.message);
                }
            };
            fetchPayerAddress();
        } else {
            setError('MetaMask is not installed');
        }
    }, []);

    const sendPayment = async () => {
        try {
            // Call the sendPayment function of the smart contract
            await contract.methods.sendPayment(amount, receiver).send({ from: payer });
            // Display success message or update UI accordingly
        } catch (error) {
            // Handle error
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Payments Smart Contract Interaction</h1>
            {error && <div>Error: {error}</div>}
            <input type="text" placeholder="Payer" value={payer} readOnly />
            <input type="text" placeholder="Receiver" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
            <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={sendPayment}>Send Payment</button>
        </div>
    );
}
