import { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../blogs.json';
import Card from './cards.jsx';

const contractAddress = "0xa8205890dcf006cf801c01f664f2a5a528a27b3c";
const abi = ABI;


export default function Main() {
    const [storeValue, setStoreValue] = useState([]);
    const [error, setError] = useState(null);
    const [contract, setContract] = useState(null);

    const [title, setTitle] = useState();
    const [body, setBody] = useState()



    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if MetaMask or an Ethereum provider is available
                if (window.ethereum) {
                    // Initialize Web3 with the current provider
                    const web3 = new Web3(window.ethereum);

                    // Request access to the user's MetaMask account
                    await window.ethereum.request({ method: 'eth_requestAccounts' });

                    // Create a contract instance
                    const contractInstance = new web3.eth.Contract(abi, contractAddress);
                    setContract(contractInstance);

                    // Call the contract function to get the value stored in the 'store' variable
                    const value = await contractInstance.methods.getBlog().call();
                    setStoreValue(value);
                } else {
                    throw new Error('MetaMask or an Ethereum provider is not detected');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const upload = async () => {
        await contract.methods.createBlog(title, body).send({ from: window.ethereum.selectedAddress })
    }



    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Smart Contract Interaction</h1>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
            <input type="text" onChange={(e) => setBody(e.target.value)} />
            <button onClick={upload}>upload Blog</button>
            <br />
            {
                storeValue && storeValue.map((value, index) => (
                    <Card key={index} {...value} />
                ))
            }



        </div>
    );
}

