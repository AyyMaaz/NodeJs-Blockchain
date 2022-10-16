//import that secure hash algorithm from the crypto-js package
const SHA256 = require('crypto-js/sha256');
index=0;
date=new Date().toLocaleTimeString();

//create a JavaScript class to represent a Block
class Block{

 
  constructor(data, previousHash){
    this.index = this.increaseindex();
    this.timestamp = this.getdate();
    this.data =data;
    this.previousHash = previousHash;
    this.hash = this.generateHash();
  }

  generateHash(){
    return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString()
  }
  getdate(){
    return new Date().toLocaleTimeString();
  }
  increaseindex(){
    return index++;
  }
}



class Blockchain{
    constructor(){
        this.blockchain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(`${index}, ${date}, "first block on the chain", ${0}`);
    }
    getTheLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }
    addNewBlock(newBlock){
        newBlock.previousHash = this.getTheLatestBlock().hash;
        newBlock.hash = newBlock.generateHash();
        this.blockchain.push(newBlock);
    }

    // testing the integrity of the chain
    validateChainIntegrity(){
        for(let i = 1; i<this.blockchain.length; i++){
            const currentBlock = this.blockchain[i];
            const previousBlock = this.blockchain[i-1];
            if(currentBlock.hash !== currentBlock.generateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            return true;

        }
    }
} 


let ShephuCoin = new Blockchain();
console.log("mining logcoin in progress...");
ShephuCoin.addNewBlock(
    new Block({
        sender: "Frank Joseph",
        recipient: "LogRocket",
        quantity: 25
    })
);

ShephuCoin.addNewBlock(
    new Block( {
        sender: "Paul val",
        recipient: "Young A",
        quantity: 34
    })
);

ShephuCoin.addNewBlock(
    new Block({
        sender: "Elena",
        recipient: "Mary",
        quantity: 34
    })
);
console.log(JSON.stringify(ShephuCoin, null, 5))