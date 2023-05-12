import React, { useState } from "react";
import Web3 from "web3"
import Ming from './Ming'
import { ethers } from "ethers";



const Hero = () => {
  const web3Instance = new Web3(window.ethereum);
  const [tokenURIs, setTokenURIs] = useState([])
  const [ticketPrice, setTicketPrice] = useState("");
  const [showDate, setShowDate] = useState("");
  const [venue, setVenue] = useState("");
  const [seatPositions, setSeatPositions] = useState([]);
  const [typee, setTypee] = useState("");
  const [mintingMessage, setMintingMessage] = useState("");
  const [mintedTokenId, setMintedTokenId] = useState("");
  const contractJSON = require('../abis/src/contracts/ticketing.sol/Ticketing.json');
  const contractABI = contractJSON;
  const contractAddress = '0xcaA906ffb2c47F75cdf6c2f7126B625a8473017f'; 
  const Contract_Web3_Connection = new web3Instance.eth.Contract(contractABI, contractAddress);

  

  const handleMintNFT = async () => {
    try {
      if (Contract_Web3_Connection && currentAccount) {
        const currentAccount = await web3.eth.getAccounts().then((accounts) => accounts[0]);
        const number = await Contract_Web3_Connection.methods.number().call();

        const tokenIds = await Contract_Web3_Connection.methods
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
    <div className="bg-[url('https://gamerwall.pro/uploads/posts/2022-02/1645692873_1-gamerwall-pro-p-kosmos-minimalizm-krasivie-oboi-1.jpg')] bg-no-repeat bg-cover')]">Hero
        <div className="flex flex-col justify-center items-center mx-auto py-10">
          
            <h1 className="text-white text-5xl font-bold text-center "> Mint &nbsp;
                <span className = "text-gradient">NFTs</span> 
            <br />

                <span>for your concert</span>  
            </h1>

            <p className="text-white font-semibold  mt-3"> Mint NFT instead of usual tickets</p>
            <div className="text-white flex flex-wrap justify-center items-center mt-10">
              <label htmlFor="tokenURIs">Tikets ID:</label>
                <input className = "text-black bg-white rounded-full p-2"
                    type="text"
                    id="tokenURIs"
                    value={tokenURIs.join(",")}
                    onChange={(e) => setTokenURIs(e.target.value.split(","))}
                  />
              </div>
              <div className="text-white flex flex-wrap justify-center items-center mt-10">
                <label htmlFor="ticketPrice">Ticket Price:</label>
                  <input className = "text-black bg-white rounded-full p-2"
                    type="text"
                    id="ticketPrice"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                  />
              </div>
              <div className="text-white flex flex-wrap justify-center items-center mt-10">
                <label htmlFor="showDate">Show Date:</label>
                  <input className = "text-black bg-white rounded-full p-2"
                    type="text"
                    id="showDate"
                    value={showDate}
                    onChange={(e) => setShowDate(e.target.value)}
                  />
              </div>
              <div className="text-white flex flex-wrap justify-center items-center mt-10">
                <label htmlFor="venue">Venue:</label>
                  <input className = "text-black bg-white rounded-full p-2"
                    type="text"
                    id="venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                  />
                </div>
              <div className="text-white flex flex-wrap justify-center items-center mt-10">
                <label htmlFor="seatPositions">Seat Positions:</label>
                  <input className = "text-black bg-white rounded-full p-2"
                    type="text"
                    id="seatPositions"
                    value={seatPositions.join(",")}
                    onChange={(e) => setSeatPositions(e.target.value.split(","))}
                  />
              </div>
              <div className="text-white flex flex-wrap justify-center items-center mt-10">
                <label htmlFor="typee">Type:</label>
                  <input className = "text-black bg-white rounded-full p-2"
                    type="text"
                    id="typee"
                    value={typee}
                    onChange={(e) => setTypee(e.target.value)}
                />
                </div>
                  <div className="flex flex-col justify-center items-center mx-auto py-10">
                  <button className="shadow-xl shadow-black text-white bg
                        bg-[#83D1F6] hover:bg-[#bd255f] p-2
                        rounded-full cursor-pointer my-4 items-center" onClick={handleMintNFT}>Mint Now</button>
                  </div>
            
        </div>
    </div>
  )
}

export default Hero