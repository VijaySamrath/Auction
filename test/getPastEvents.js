const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3('https://rinkeby.infura.io/v3/a70bb8326c604e649425af0b9f2b674f')

const ABI = [{"inputs":[{"internalType":"uint256","name":"_biddingTime","type":"uint256"},{"internalType":"address payable","name":"_beneficiary","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"beneficiary","type":"address"}],"name":"auctionCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"winner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"auctionEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"bidCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"bidder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"highestBidIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"withdrawReq","type":"event"},{"inputs":[],"name":"auctionEnd","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"auctionEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beneficiary","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bid","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"highestBidder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"highestbid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"}]


const contractAddress = '0x13322DC101135e6fB745180eBb60554434a0F112';
const contract = new web3.eth.Contract(ABI, contractAddress);
var account1 = '0x7cD26ACBBB9296e1BC031a65B69B12c5F87ccB9C'

const privateKey = Buffer.from('a56b36f62eaf0554a91f9bbbff003cd24e30f5ba55d430642c8f77907343ce96','hex');

async function main() {
    let  txCount=await web3.eth.getTransactionCount(account1);
	
    // **bid  */

        const myData = contract.methods.bid().encodeABI();
        
        const txObject = {
        nonce:web3.utils.toHex(txCount + 250),
        to:contractAddress,
        gasLimit: web3.utils.toHex(210000),
        gasPrice: web3.utils.toHex(67 * 1e9), 
        value: 1000000000000000000,
        data: myData,
        }

		console.log(txObject);
        const tx = new Tx(txObject, { chain: 'rinkeby' });
        tx.sign(privateKey);

        const serializedTransaction = tx.serialize()
        const raw = '0x' + serializedTransaction.toString('hex')

        web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
        console.log(err);
        console.log(txHash);
        });

        //**withdrawl */

        // adding "+1" to increase the Nonce. 
        let  txCount1=await web3.eth.getTransactionCount(account1) + 1;

        const myData1 = contract.methods.withdraw().encodeABI();
        
        const txObject1 = {
        nonce:web3.utils.toHex(txCount1 + 250),
        to:contractAddress,
        gasLimit: web3.utils.toHex(210000),
        gasPrice: web3.utils.toHex(67 * 1e9), 
        value: 1000000000000000000,
        data: myData1,
        }

		console.log(txObject1);
        const tx1= new Tx(txObject, { chain: 'rinkeby' });
        tx.sign(privateKey);

        const serializedTransaction1 = tx1.serialize()
        const raw1 = '0x' + serializedTransaction1.toString('hex')

        web3.eth.sendSignedTransaction(raw1,(err,txHash)=>{
        console.log(err);
        console.log(txHash);
        });

        //**to getPast events */
	contract.getPastEvents(
    'AllEvents',
 {
    fromBlock: 11258630,
    toBlock:  'latest'
}, 
(err, events) => { console.log(events) } 

)


}
main();