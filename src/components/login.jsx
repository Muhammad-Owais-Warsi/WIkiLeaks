import { useState } from "react";
import Web3 from "web3"
import { useNavigate } from "react-router-dom";


export default function Login() {

    const [account,setAccount] = useState();

    const navigate = useNavigate()

    const connect = async () => {
        try {
          // Check if MetaMask is installed
          if (window.ethereum) {
            // Initialize Web3 with the current provider
            const web3 = new Web3(window.ethereum);
  
            // Request access to the user's MetaMask account
            await window.ethereum.request({ method: 'eth_requestAccounts' });
  
            // Get the current account address
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
            navigate("/home",{ state: { myProp: account } })

          } else {
            throw new Error('MetaMask is not installed');
          }
        } catch (error) {
          setError(error.message);
        }
      };

    return (
        <>
            <h1>Home Page</h1>
            <br></br>
            <button onClick={connect}>Login</button>
        </>

    )
}