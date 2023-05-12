import ethlogo from "./ethlogo.png"
import {useEffect, useState} from "react";

const Header = ( ) => {
  const [walletAddress, setWalletAddress] = useState('');

   const connectWallet = async () => {
    if (typeof window!== 'undefined' && typeof window.ethereum!= 'undefined') {
      try{
        const accounts = await  window.ethereum.request({method: 'eth_requestAccounts'});
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err){
        console.error(err.message);
      }
    } else {
      console.log('Install Metamask');
    }
  };
  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  });

  const getCurrentWalletConnected = async () => {
    if (typeof window!== 'undefined' && typeof window.ethereum!= 'undefined') {
      try{
              const accounts = await  window.ethereum.request({method: 'eth_accounts'});
              if (accounts.length > 0) {
                setWalletAddress(accounts[0]);
                console.log(accounts[0]);
              } else{
                console.log('No wallet connected');
              }
            } catch (err){
              console.error(err.message);
            }
          } else {
            console.log('Install Metamask');
          }
        };

  const addWalletListener = async () => {  
    if (typeof window!== 'undefined' && typeof window.ethereum!= 'undefined') {
      window.ethereum.on('accountsChanged', (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      setWalletAddress(null);
    }
  }
  
  return (
    <nav className="w-4/5 flex justify-between items-center px-4 py-2">
        <div className="flex flex-row justify-start items-center 
        md:flex-[0.5] flex-initial">
            <img src={ethlogo} alt="logo" className="h-10 w-10 mr" />
            <span className = "text-white text-2xl ml-2"> NFT Ticketing</span>

        </div>

        <ul className="md:flex-[0.5] text-white md:flex flex-row justify-between items-center flex-inital">
          <li className="mx-4 cursor-pointer">
            Home
          </li>
          <li className="mx-4 cursor-pointer">
            About
          </li>
          <li className="mx-4 cursor-pointer">
            Contact
          </li>

          <button className="button is-white shawod-xl shadow-black text-white
          bg-[#83D1F6] hover:bg-[#bd255f] md:text-xs p-2
          rounded-full cursor-pointer" onClick={connectWallet}>
            <span className="is-link has-text-weight-bold">
              {walletAddress && walletAddress.length > 0? `Connected: ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}` : "Connect Wallet"}
            </span>
          </button>
        </ul>
    </nav>
  )
}

export default Header