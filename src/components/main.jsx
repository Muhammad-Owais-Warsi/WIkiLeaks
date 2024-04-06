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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 mb-4">Create A Leak.</h1>
            <div className="max-w-xl w-full mx-auto grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-xl shadow-md">
                    <input
                        type="text"
                        placeholder="Title..."
                        className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring focus:border-blue-300"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="bg-gradient-to-r from-orange-400 to-red-500 p-4 rounded-lg shadow-md">
                    <textarea
                        placeholder="Content..."
                        className="w-full h-32 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300 resize-none"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>
                <button
                    className="bg-gradient-to-r from-orange-400 to-red-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-lg"
                    onClick={upload}
                >
                    Upload Leak.
                </button>
            </div>
            <div className="max-w-xl w-full mx-auto mt-8 grid grid-cols-1 gap-4">
                {storeValue.map((value, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-2">{value.title}</h2>
                        <p className="text-gray-600 text-sm mb-2">{value.body}</p>
                        <div className="flex items-center justify-between text-gray-500 text-xs">
                            <p>Author: {value.author}</p>
                            <p>Date: {value.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

