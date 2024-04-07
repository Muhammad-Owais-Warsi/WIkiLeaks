import { useState, useEffect } from "react";
import web3 from "web3"; // Assuming web3 is properly configured and available

import Card from "./cards.jsx";
import ABI from '../../blogs.json';

const contractAddress = "0xa8205890dcf006cf801c01f664f2a5a528a27b3c";

export default function Explore() {
    const [storeValue, setStoreValue] = useState([]);
    const [contract, setContract] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const contractInstance = new web3.eth.Contract(ABI, contractAddress);
                setContract(contractInstance);

                // Call the contract function to get the value stored in the 'store' variable
                const value = await contractInstance.methods.getBlog().call();
                setStoreValue(value);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-xl w-full mx-auto mt-8 grid grid-cols-1 gap-4">
            {storeValue.map((value, index) => (
                <Card key={index} {...value} />
            ))}
        </div>
    );
}
