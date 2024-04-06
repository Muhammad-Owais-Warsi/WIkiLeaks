import { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../abi.json';
import { useLocation } from 'react-router-dom';

const contractAddress = "0x8b772cd0f148b3c969fa9e2d2a5fc9c70b1bc958";
const abi = ABI;


export default function Main() {
  const [storeValue, setStoreValue] = useState("");
  const [error, setError] = useState(null);
  const [contract, setContract] = useState(null);

  const state = useLocation();
  const account = state & state.meProp;

  const [name,setName] = useState();

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
          const value = await contractInstance.methods.get().call();
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

  const setValue = async () => {
    try {
      // Call the contract function to set a new value
      await contract.methods.set(name).send({ from: window.ethereum.selectedAddress });

      // Update the stored value
      const newValue = await contract.methods.get().call();
      setStoreValue(newValue);
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
      Current address {account}
      <br></br>
      <input type="text" onChange={(e) => setName(e.target.value)}/>
      <button onClick={setValue}>Set New Value</button>
      <p>Value stored in the contract: {storeValue}</p>
    </div>
  );
}