const Web3 = require('web3');

//**TO get live events */
const web3 =new Web3('wss://rinkeby.infura.io/ws/v3/79e94aea484649b1bd26c79c144cd054');
const ABI = [{"inputs":[{"internalType":"uint256","name":"_biddingTime","type":"uint256"},{"internalType":"address payable","name":"_beneficiary","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"beneficiary","type":"address"}],"name":"auctionCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"auctionEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"bidCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"bidder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"highestBidIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"withdrawReq","type":"event"},{"inputs":[],"name":"auctionEnd","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"auctionEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bid","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"highestBidder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"highestbid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"}]

const contractAddress = '0x13322DC101135e6fB745180eBb60554434a0F112';
const contract = new web3.eth.Contract(ABI, contractAddress);
contract.events.allEvents()
.on('data', (event) => {
  console.log(event);
})
.on('error', console.error);

//**to get particular events */

// contract.events.highestBidIncreased()
// .on('data', (event) => {
//   console.log(event);
// })
// .on('error', console.error);


