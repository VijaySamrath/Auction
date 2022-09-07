// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KIRAN is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("KIRAN", "KIR") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

     function totalSupply() public view override returns (uint256) {
        return totalSupply();

    }

    function burn(address account , uint256 amount) public {

        _burn (account , amount);

    }
    function transfer(address recipient , uint256 amount) public virtual override returns(bool){
        super.transfer( recipient , amount);
        return false;
        
    

    }
    
    
    function transferOwnership(address newOwner) public override onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }
}