import { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../Blog.json'; // Import the ABI of your deployed smart contract

const contractAddress = "0x8b772CD0F148B3c969FA9e2D2a5fC9c70b1Bc958"; // Update with the correct contract address on XinFin network
const abi = ABI; // Use the ABI imported from the JSON file

export default function Main() {
    const [storeValue, setStoreValue] = useState([]);
    const [error, setError] = useState(null);
    const [contract, setContract] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Connect to XinFin network using a Web3 provider
                const web3 = new Web3('https://rpc.apothem.network');
                
                // Create a contract instance
                const contractInstance = new web3.eth.Contract(abi, contractAddress);
                setContract(contractInstance);

                // Call the contract function to get the value stored in the 'store' variable
                const value = await contractInstance.methods.getBlog().call();
                setStoreValue(value);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const upload = async () => {
        try {
            // Ensure MetaMask is connected and authorized
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Call the contract method to create a new blog post
            await contract.methods.createBlog(title, body).send({ from: window.ethereum.selectedAddress });

            // Refresh the stored blog posts
            const updatedValue = await contract.methods.getBlog().call();
            setStoreValue(updatedValue);
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Smart Contract Interaction</h1>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" />
            <button onClick={upload}>Upload Blog</button>
            <br />
            {storeValue.map((value, index) => (
                <ul key={index}>
                    <li>{value.title}</li>
                    <li>{value.body}</li>
                    <li>{value.author}</li>
                </ul>
            ))}
        </div>
    );
}
