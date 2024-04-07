import Web3 from 'web3';
import paymentsABI from '../../paymentAbi.json';
import { useState, useEffect } from 'react';

const PaymentAddress = "0x8f01ee013392d343a858ae2c74878b8767550d2b";

export default function Card(props) {
    const [contract, setContract] = useState(null);
    const [payer, setPayer] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const initializeContract = async () => {
            try {
                if (window.ethereum) {
                    const web3Instance = new Web3(window.ethereum);
                    const contractInstance = new web3Instance.eth.Contract(paymentsABI, PaymentAddress);
                    setContract(contractInstance);

                    const accounts = await web3Instance.eth.getAccounts();
                    setPayer(accounts[0]);
                } else {
                    throw new Error('MetaMask is not installed');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        initializeContract();
    }, []);

    const sendPayment = async (receiver) => {
        try {
            if (!contract) {
                throw new Error('Contract not initialized');
            }
            if (!payer) {
                throw new Error('Payer address not found');
            }

            // Validate the receiver address
            if (!Web3.utils.isAddress(receiver)) {
                throw new Error('Invalid receiver address');
            }

            // Convert the value to Wei
            const valueInWei = Web3.utils.toWei('0.1', 'ether');

            await contract.methods.sendPayment(receiver).send({ from: payer, value: valueInWei });
            // Display success message or update UI accordingly
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">{props.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{props.body}</p>
            <div className="flex items-center justify-between text-gray-500 text-xs">
                <button value={props.author} onClick={() => sendPayment(props.author)}>Donate</button>
                <p>Date: {props.date}</p>
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}
