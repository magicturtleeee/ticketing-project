import Header from "./components/Header"
import Hero from "./components/Hero"
import Alert from './components/Alert'
import Loading from './components/Loading'
import Concert from './components/Concert'
import Ming from './components/Ming'


import React, { useState, useEffect, useCallback } from "react";
import Web3 from 'web3';
import {loadData} from './components/Ming.jsx';




const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');
  const [lotteryPlayers, setLotteryPlayers] = useState([]);
  const [number, setNumber] = useState(null);
  const handleWeb3 = async () => {
    const data = await loadData();
    setContract(data.contract);
    setCurrentAccount(data.addressAccount);
    setLotteryPlayers(data.number);
    setWeb3(new Web3(data.web3Provider));
    setNumber(data.number);
    console.log(data);
  }

  useEffect(() => {
    connectToMetaMask();
    loadContract();
  }, []);


  const connectToMetaMask = useCallback(async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask first.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const address = accounts[0];
        setCurrentAccount(address);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadContract = async () => {
    // Загрузите JSON-файл вашего контракта и его ABI
    const contractJSON = require('./abis/src/contracts/ticketing.sol/Ticketing.json');
    const contractABI = contractJSON.abi;
    const contractAddress = '0x7A8FC83B0d1784F9CecD490AD0d58bb1Ccc95D38'; // Замените на адрес вашего контракта

    // Создайте экземпляр контракта с помощью web3.js
    const web3Instance = new Web3(window.ethereum);
    setWeb3(web3Instance);
    const contract = new web3Instance.eth.Contract(contractABI, contractAddress);
    setContract(contract);
  };
  
  

  const joinLottery = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const lotteryId = 1; 

      await contract.methods.joinLottery(lotteryId).send({ from: accounts[0] });

      const players = await contract.methods.getLotteryPlayers(lotteryId).call();
      setLotteryPlayers(players);
    } catch (error) {
      console.log(error);
    }
  };

  const chooseWinner = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const lotteryId = 1; 

      await contract.methods.chooseWinner(lotteryId).send({ from: accounts[0] });

      const players = await contract.methods.getLotteryPlayers(lotteryId).call();
      setLotteryPlayers(players);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      <Concert />
      <Alert/>
      <Loading/>
      <div >
      <Ming contract = {contract} currentAccount = {currentAccount}/>
        <div className="bg-[url('https://gamerwall.pro/uploads/posts/2022-02/1645692873_1-gamerwall-pro-p-kosmos-minimalizm-krasivie-oboi-1.jpg')] bg-no-repeat bg-cover')]">
        <p>
          <button className="shadow-xl shadow-black text-white bg
                        bg-[#83D1F6] hover:bg-[#bd255f] p-2
                        rounded-full cursor-pointer my-4 items-center" onClick={joinLottery}>Join Lottery</button>
        </p>
        <div >
                  <button className="shadow-xl shadow-black text-white bg
                                bg-[#83D1F6] hover:bg-[#bd255f] p-2
                                rounded-full cursor-pointer my-4 items-center" onClick={chooseWinner}>Choose Winner</button>
    
        <p className="text-white">Current Account: {currentAccount}</p>
        <p className="text-white">Lottery Players: {lotteryPlayers.join(", ")}</p>
        </div>
      </div>
     
      </div>

      
    </div>
  )
}

export default App;