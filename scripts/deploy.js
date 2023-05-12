const { ethers } = require('hardhat')
const fs = require('fs')

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');
  const [lotteryPlayers, setLotteryPlayers] = useState([]);

  useEffect(() => {
    connectToMetaMask();
    loadContract();
  }, []);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setCurrentAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('MetaMask not found');
    }
  };

  const loadContract = async () => {
    
    const contractJSON = require('./src/abis/Ticketing.json');
    const contractABI = contractJSON.abi;
    const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; 
    
    const contract = new web3.eth.Contract(contractABI, contractAddress);
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
    <div>
      <h1>Lottery DApp</h1>
      {currentAccount && <p>Current Account: {currentAccount}</p>}
      <button onClick={joinLottery}>Join Lottery</button>
      <button onClick={chooseWinner}>Choose Winner</button>
      <h2>Lottery Players</h2>
      <ul>
        {lotteryPlayers.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;