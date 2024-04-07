import { useState } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";



export default function Login() {
    const [account, setAccount] = useState();

    const navigate = useNavigate();

    const connect = async () => {
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
                // Initialize Web3 with the current provider
                const web3 = new Web3(window.ethereum);

                // Request access to the user's MetaMask account
                await window.ethereum.request({ method: "eth_requestAccounts" });

                // Get the current account address
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0]);
                navigate("/home", { state: { myProp: account } });
            } else {
                throw new Error("MetaMask is not installed");
            }
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <>
            <div class="bg-[#03001C] h-screen">

                <div class="flex justify-between  items-start">
                    <div class="flex-col text-4xl mt-4 ml-4 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                        WikiLeaks
                    </div>
                    <div class="flex-row text-slate-50 text-sm">
                        <button
                            onClick={connect}
                            class="h-10 w-32 bg-[#9400FF]  hover:to-red-500 hover:bg-gradient-to-r hover:from-orange-400 hover:bg-clip-text hover:text-transparent text-[#AED2FF] mt-4 font-bold py-2 px-4 mr-4 rounded-xl"
                        >
                            Login
                        </button>
                    </div>
                </div>
                <p class="mt-10 ml-4 text-[#EEEEEE] text-justify  max-w-3xl">
                    Welcome to WikiLeaks Dapp, where transparency meets security in
                    the world of decentralized information sharing. Our platform is
                    designed to empower whistleblowers and journalists alike,
                    providing a safe haven for the disclosure of sensitive information
                    without fear of censorship or compromise. With end-to-end
                    encryption and blockchain technology at its core, WikiLeaks Dapp
                    ensures that leaked documents remain secure and immutable,
                    safeguarding the truth for the greater good. Join us in the fight
                    for transparency and accountability, where every voice matters.
                </p>
                <div class="absolute top-1/2">
                    <div class="justify-between ml-2 items-start text-[#AED2FF] w-32 h-10 font-bold bg-[#9400FF] hover:to-red-500 hover:bg-gradient-to-r hover:from-orange-400 hover:bg-clip-text hover:text-transparent rounded-xl">
                        <button class="py-2 px-8" onClick={() => navigate("/explore")}>Explore</button>
                    </div>

                </div>
                <div class="absolute top-1/2">
                    <div class="justify-between items-start text-[#AED2FF] w-32 h-10 font-bold ml-40 bg-[#9400FF] hover:to-red-500 hover:bg-gradient-to-r hover:from-orange-400 hover:bg-clip-text hover:text-transparent rounded-xl">
                        <button class="py-2 px-10">Post</button>
                    </div>
                </div>
                <marquee class="text-slate-50 relative top-72" behavior="" direction="">Still in Development 💀💀💀</marquee>
            </div>
        </>
    );
}
