# EthKan Contract UI Demo

"Demo dapp with buttons that call EthKan contract functions."

Follow instructions at ethkan-contracts first. Then come here.
<br>
<br>
Your MetaMask Chrome extension must be set to the Ganache network. Open and login to MetaMask and select "Custom RPC" and enter the url Ganache is running on. Default is `http://localhost:7545`.
<br>
You will also need to use an address with test Ether. Copy the private key by clicking the key icon on the right of the list of default addresses. 
<br>
Back in MetaMask, click the user icon and select "create new account." Use the copied private key to create a MetaMask account with test Ether.
<br>
If you see your new test user's balance at 95 Ether or more then you are ready to start dapping.
```
Clone this repo locally. 
<br>
<br>
Open `App.js` and ensure configs are hard coded correctly to match testnet url and deployed contract addres.
<br>
Config vars in App.js should look something like this:
```
// configs
var ethNodeUrl = 'ws://localhost:7545'; // my localhost ganache
var ethKanDeployedAddress = '0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4'; // address of contract deployed to ganache using truffle
var gasLimit = 500000; // this is too high for production
```
If you run into this error it means you probably didn't set this up right: `Error: Couldn't decode address from ABI: 0x0`
<br>
<br>
From inside repo.
```
npm install
```
```
npm start
```

