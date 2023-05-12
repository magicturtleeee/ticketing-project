// SPDX-License-Identifier: UNLICENSED
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Ticketing is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    constructor() ERC721("My NFT", "MNFT")  {}
    struct Ticket {
        uint256 tokenId;
        string tokenURI;
        uint256 ticketPrice;
        address ownerT;
        bool isRedeemed;
        uint256 showDate;
        string venue;
        string seatPosition;
        string typee; 
    }
    uint256 public totalTickets;
    uint256 public maxTickets = 1000;
    mapping (uint256 => Ticket) public tickets;

    function mintNFT(string[] memory tokenURI, uint256 _ticketPrice, uint256 _showDate, string memory _venue, string[] memory _seatPosition, string memory _typee) public returns (uint256[] memory) {
        require(totalTickets < maxTickets, "Maximum number of tickets already minted");
        require(msg.sender!=address(0));
        uint256[] memory tokenIds = new uint256[](tokenURI.length);
        for (uint i = 0; i < tokenURI.length; i++){
            uint256 newItemId = _tokenIds.current();
            _safeMint(msg.sender, newItemId);
            _setTokenURI(newItemId, tokenURI[i]);
            _tokenIds.increment();
            tokenIds[i] = newItemId;
            Ticket memory newTicket = Ticket(newItemId, tokenURI[i], _ticketPrice, msg.sender, false, _showDate, _venue, _seatPosition[i], _typee);
            tickets[newItemId] = newTicket;
            totalTickets++;
        }
        return tokenIds;
    
    }
    function transferNFT(address  from, address to, uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "transfer caller is not owner nor approved");
        Ticket storage ticket = tickets[tokenId];
        require(!ticket.isRedeemed, "Ticket has already been redeemed");
        ticket.ownerT = to;
        tickets[tokenId].ownerT=to;
        transferFrom(from, to, tokenId);
        ticket.isRedeemed = true;
    }
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        string memory _tokenURI = tokenURI(tokenId);
        return _tokenURI;
    }
        // Lottery 
    struct Lottery {
        address ownerL;
        address[] players;
        address winner;
        bool completed;
        uint256 id;
        uint256 lotteryId;
    }
    mapping(uint256 => Lottery) public lot;
    uint256 public lotterytickets;
    uint256 public price;
    address public ownerL;

    uint256 public lotteryId =0;
    function lotteryforticket(uint256 tokenId, uint256 _price, uint256 _lotterytickets) public {
        Ticket storage ticket = tickets[tokenId];
        require(ticket.ownerT == msg.sender, "It is not your ticket");
        require(!ticket.isRedeemed, "Ticket has already been redeemed"); 
        address[] memory emptyArray;
        ownerL = msg.sender;
        Lottery memory newLottery = Lottery(ownerL, emptyArray, address(0), false, tokenId, lotteryId);
        lotterytickets = _lotterytickets;
        price = _price;
        lot[lotteryId] = newLottery;
        lotteryId++;
    }
    modifier onlyowner() {
        require(msg.sender == ownerL, "Only owner can use this function");
        _;
    }

    function enter(uint256 lotteryIdd) public payable returns (address[] memory) {
        // current ticketId is not redeemed
        Lottery storage lottery = lot[lotteryIdd];       
        // require at least price ether for entering
        require(msg.sender.balance >= price, "You don't have enough money");

        // require lottery is not over
        require(lottery.completed != true, "Sorry, lottery is over");

        require(lottery.players.length < lotterytickets, "All tickets are sold");

        for (uint i = 0; i < lottery.players.length; i++) {
            require(lottery.players[i]!= msg.sender, "You've already joined!");
        }
        lottery.players.push(msg.sender);
        return (lottery.players);
    }

    function getRandomNumber() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(ownerL, block.timestamp)));
    }
    function choosewinner(uint256 lotteryIdd) public onlyowner {
        Lottery storage lottery = lot[lotteryIdd];
        require(lottery.completed != true, "Sorry, lottery is over");
        uint index = getRandomNumber() % lottery.players.length;
        lottery.winner = lottery.players[index];
        lottery.completed = true;
        transferNFT(ownerL,lottery.winner,lottery.id);
        lottery.players = new address [](0);
    } 

}