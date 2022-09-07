//SPDX-License-Identifier:MIT

pragma solidity 0.8.16;
contract Auction{
    address payable public beneficiary;
    uint public auctionEndTime;
    
    // current state of the auction 
    address public highestBidder;
    uint public highestbid; 
    bool ended;
    
    mapping(address => uint) pendingReturns;
    
    event highestBidIncreased(address bidder, uint amount);
    event auctionEnded(address winner, uint amount);
    event auctionCreated(address beneficiary);
    event bidCreated(uint amount, address indexed sender);
    event withdrawReq(uint amount, address indexed sender);
    
    constructor(uint _biddingTime, address payable _beneficiary)
{
        beneficiary = _beneficiary;
        auctionEndTime = block.timestamp + _biddingTime; 
        emit auctionCreated(beneficiary); 
            }
    function bid() public payable {
               require(block.timestamp < auctionEndTime,"The Auction time is Over");
                       if(msg.value > highestbid) {
            
            if(pendingReturns[msg.sender]>0)
            {
                uint amount = pendingReturns[msg.sender];
                payable(msg.sender).transfer(amount);
            }
            pendingReturns[msg.sender] = msg.value; 
            highestBidder = msg.sender;
            highestbid = msg.value;
            emit highestBidIncreased(msg.sender, msg.value);
            emit bidCreated(msg.value, msg.sender);
        }
        else {
            revert('sorry, the bid is not high enough!');
        }
     }
     function withdraw() public payable returns(bool) {
               require(ended,"You Cannot Withdraw Until The Auction Has Ended");

        uint amount = pendingReturns[msg.sender];
        if(amount > 0) {
            pendingReturns[msg.sender] = 0;
        }
        
        if(!payable(msg.sender).send(amount)) {
            pendingReturns[msg.sender] = amount;

            emit withdrawReq(msg.value, msg.sender);
        }
        return true;
    }
    function auctionEnd() public {
               require(block.timestamp > auctionEndTime,'The Auction Cannot End Before The Specified Time');

        if(ended) revert('the auction is already over!');
        ended = true;
        emit auctionEnded(highestBidder, highestbid);
        beneficiary.transfer(highestbid);
    }
}

// contract address 0x13322DC101135e6fB745180eBb60554434a0F112