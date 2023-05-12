import React, { useState } from "react";
import Web3 from "web3"


const web3Instance = new Web3(window.ethereum);
export const loadData = async () => {
  var provider = ethers.getDefaultProvider("sepolia");
  const contractJSON = require('../abis/src/contracts/ticketing.sol/Ticketing.json');
  const contractABI = contractJSON.abi;
  const contractAddress = '0x7A8FC83B0d1784F9CecD490AD0d58bb1Ccc95D38'; 
  const Contract_Web3_Connection = new web3Instance.eth.Contract(contractABI, contractAddress);

  const addressAccount = currentAccount;
  const number = await Contract_Web3_Connection.methods.number().call();
  return {Contract_Web3_Connection, addressAccount, number, сontractAddress};
}

const Ming = ({ contract, currentAccount }) => {
  const [tokenURIs, setTokenURIs] = useState([]);
  const [ticketPrice, setTicketPrice] = useState("");
  const [showDate, setShowDate] = useState("");
  const [venue, setVenue] = useState("");
  const [seatPositions, setSeatPositions] = useState([]);
  const [typee, setTypee] = useState("");
  const [mintingMessage, setMintingMessage] = useState("");
  const [mintedTokenId, setMintedTokenId] = useState("");

  const handleMintNFT = async () => {
    try {
      if (contract && currentAccount) {
        const tokenIds = await contract.methods
          .mintNFT(tokenURIs, ticketPrice, showDate, venue, seatPositions, typee)
          .send({ from: currentAccount });


        setTokenURIs([]);
        setTicketPrice("");
        setShowDate("");
        setVenue("");
        setSeatPositions([]);
        setTypee("");

        setMintingMessage("Successfully minted NFT");
        setMintedTokenId(tokenIds[0]);
      } else {
        console.log("Contract or currentAccount not loaded")
      }
      } catch (error) {
      console.log(error);
    }
  };

  const viewTicketDetails = (tokenId) => {
    console.log("Viewing ticket details for tokenId:", tokenId);
  };

  return (
    <div className="bg-[url('https://gamerwall.pro/uploads/posts/2022-02/1645692873_1-gamerwall-pro-p-kosmos-minimalizm-krasivie-oboi-1.jpg')] bg-no-repeat bg-cover')]">
      <h2 className="text-white text-3xl text-center my-2 ">Buy Ticket</h2>
      <div className="text-white flex flex-wrap justify-center items-center mt-10 ">
        <label htmlFor="tokenURIs">Ticked ID:</label>
        <input className = "text-black bg-white rounded-full p-2"
          type="text"
          id="tokenURIs"
          value={tokenURIs.join(",")}
          onChange={(e) => setTokenURIs(e.target.value.split(","))}
        />
      </div>
      <div className="text-white flex flex-wrap justify-center items-center mt-10">
        <label htmlFor="ticketPrice">Contract ID:</label>
        <input className = "text-black bg-white rounded-full p-2"
          type="text"
          id="ticketPrice"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-center items-center mx-auto py-10">
      <button className="shadow-xl shadow-black text-white bg
            bg-[#83D1F6] hover:bg-[#bd255f] p-2
            rounded-full cursor-pointer my-4 items-center" onClick={handleMintNFT}>Buy ticket</button>
      </div>
            

      {mintingMessage && <p>{mintingMessage}</p>}
      {mintedTokenId && (
        <div>
          <p>Minted Token ID: {mintedTokenId}</p>
          <button onClick={() => viewTicketDetails(mintedTokenId)}>
            View Ticket Details
          </button>
        </div>
      )}
    </div>
  );
};

export default Ming;