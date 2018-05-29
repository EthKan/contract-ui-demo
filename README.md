# EthKan Contract UI Demo

> Demo dapp with buttons that call EthKan contract functions.

The point of this dapp is to be as simple as possible. Almost everything is in `App.js`. Even though it was made with `create-react-app` it is actually structured as a simple `jquery` html page.

## Install
Follow instructions at ethkan-contracts first. Then come here.
#### Set up MetaMask
- Your MetaMask Chrome extension must be set to the Ganache network. Open and login to MetaMask and select "Custom RPC" and enter the url Ganache is running on. Default is `http://localhost:7545`.
- You will also need to use an address with test Ether. Copy the private key by clicking the key icon on the right of the list of default addresses. 
- Back in MetaMask, click the user icon and select "create new account." Use the copied private key to create a MetaMask account with test Ether.
- If you see your new test user's balance at 95 Ether or more then you are ready to start dapping.

#### Set up configs
- Clone this repo locally. 
- Open `App.js` and ensure configs are hard coded correctly to match testnet url and deployed contract addres.
- Config vars in App.js should look something like this:
```
// configs
var ethNodeUrl = 'ws://localhost:7545'; // my localhost ganache
var ethKanDeployedAddress = '0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4'; // address of contract deployed to ganache using truffle
var gasLimit = 500000; // this is too high for production
```
- Make sure `ethKanDeployedAddress` matches the address from the truffle terminal where you deployed from ethkan-contracts repo instructions
- Make sure the `EthKan.json` file matches the `./build/contracts/EthKan.json` of the deployed contract you want your dapp to talk to.

#### Run Dapp
From inside repo.
```
npm install
```
```
npm start
```

#### Common Errors
```
Error: the tx doesn't have the correct nonce. account has nonce of: 6 tx has nonce of: 5
```
- If you receive this error it means MetaMask is out of sync with your local testnet. Try using a different address from Ganache by creating a new MetaMask account by importing the private key.
```
Error: Couldn't decode address from ABI: 0x0
```
- If you run into this error it means you probably did not set the correct `ethKanDeployedAddress` config in App.js. Make sure you copy the deployed EthKan contract address from the truffle terminal log from when you deployed the EthKan contract. Contract deployment instructions are in ethkan-contracts repo.
```
Error: VM Exception while processing transaction: revert
```
- If you run into this error it means something about your user input violates the contract rules. Calling a method that requires owner access from an address that is not that owner address for example. Or funding a card that is already approved.

## Usage
Vid of install and usage: https://www.youtube.com/watch?v=B_xZZ0eIq_Y
<br>
(Skip any parts that are boring. Usage is at the very end.)