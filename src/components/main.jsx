import { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../Blog.json';

// Update the contract address and ABI for the smart contract deployed on the XDC network
const contractAddress = "0x8b772CD0F148B3c969FA9e2D2a5fC9c70b1Bc958";
const abi = ABI;

export default function Main() {
    const [storeValue, setStoreValue] = useState([]);
    const [error, setError] = useState(null);
    const [contract, setContract] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (window.ethereum) {
                    // Initialize Web3 with the current provider (MetaMask)
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
        try {
            // Call the contract method to create a new blog post
            await contract.methods.createBlog(title, body).send({ from: window.ethereum.selectedAddress });
            // After successful upload, fetch the updated blog data
            const updatedValue = await contract.methods.getBlog().call();
            setStoreValue(updatedValue);
            // Clear the input fields after successful upload
            setTitle('');
            setBody('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Smart Contract Interaction</h1>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" />
            <button onClick={upload}>Upload Blog</button>
            <br />
            {storeValue && storeValue.map((value, index) => (
                <ul key={index}>
                    <li>Title: {value.title}</li>
                    <li>Body: {value.body}</li>
                    <li>Author: {value.author}</li>
                </ul>
            ))}
            {error && <div>Error: {error}</div>}
        </div>
    );
}
