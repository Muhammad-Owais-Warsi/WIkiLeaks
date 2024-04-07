import { useState } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [account, setAccount] = useState();
    const navigate = useNavigate();

    const connect = async () => {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: "eth_requestAccounts" });
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
            <div className="bg-[#03001C] h-screen">
                <div className="flex justify-between items-start">
                    <div className="flex-col text-4xl mt-4 ml-4 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                        WikiLeaks
                    </div>
                    <div className="flex-row text-slate-50 text-sm">
                        <button
                            onClick={connect}
                            className="h-10 w-32 mr-6 bg-[#9400FF] hover:to-red-500 hover:bg-gradient-to-r hover:from-orange-400 hover:bg-clip-text hover:text-transparent text-[#AED2FF] mt-4 font-bold py-2 px-4 rounded-xl"
                        >
                            Login
                        </button>
                    </div>
                </div>
                <p className="mt-10 ml-4 text-[#EEEEEE] text-justify max-w-3xl">
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
                <div className="flex justify-start items-start mt-10 ml-4">
                    <button
                        className="h-10 w-32 bg-[#9400FF] hover:to-red-500 hover:bg-gradient-to-r hover:from-orange-400 hover:bg-clip-text hover:text-transparent text-[#AED2FF] font-bold py-2 px-4 rounded-xl"
                        onClick={() => navigate("/explore")}
                    >
                        Explore
                    </button>
                    <button
                        
                        className="h-10 w-32 ml-4 bg-[#9400FF] hover:to-red-500 hover:bg-gradient-to-r hover:from-orange-400 hover:bg-clip-text hover:text-transparent text-[#AED2FF] font-bold py-2 px-4 rounded-xl"
                        onClick={() => navigate("/post")}
                    >
                        Post
                    </button>
                </div>
                <marquee className="text-slate-50 mt-10" behavior="scroll" direction="left">
                    Still in Development 💀💀💀
                </marquee>
            </div>
        </>
    );
}
