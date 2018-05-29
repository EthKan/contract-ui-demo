import React, {Component} from 'react';
import $ from 'jquery';
import Web3 from 'web3';

import logo from './logo.svg';
import './App.css';
import EthKan from './EthKan';

// using jquery because this is just a proof of concept
// and jquery is easy
$ (document).ready (function () {
  // configs
  var ethNodeUrl = 'ws://localhost:7545'; // my localhost ganache
  var ethKanDeployedAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10'; // address of contract deployed to ganache using truffle
  var gasLimit = 500000; // this is too high for production

  // get and set selected address from MetaMask
  var metaMaskAddr;
  if (typeof window.web3 !== 'undefined') {
    metaMaskAddr = window.web3.eth.defaultAccount;
  } else {
    alert ('Sorry, you need a web3 browser or MetaMask chrome extension.');
  }

  // connect npm Web3 v1 to running eth node
  var web3v1 = new Web3 (Web3.givenProvider || ethNodeUrl);

  // use contract abi and address provided by my MetaMask to create local instance of contract
  var ethKanContract = new web3v1.eth.Contract (EthKan.abi, {
    from: metaMaskAddr,
    gasPrice: '20000000000', // default gas price in wei, 20 gwei in this case
  });

  // set local contract instance to address of deployed EthKan contract
  ethKanContract.options.address = ethKanDeployedAddress;

  // ui event for create project
  $ ('#create-project').click (function () {
    var inputProjSymbol = $ ('#create-project-input1').val ();
    metaMaskAddr = window.web3.eth.defaultAccount;
    // create project
    ethKanContract.methods
      .createProject (inputProjSymbol)
      .send ({from: metaMaskAddr, gas: gasLimit})
      .on('receipt', function(receipt){
        $ ('#create-project-result1').html('created_new_project: ' + inputProjSymbol);
      })
      .on('error', console.error);
  });

  // ui event for project info
  $ ('#project-info').click (function () {
    var inputProjSymbol = $ ('#project-info-input1').val ();
    metaMaskAddr = window.web3.eth.defaultAccount;
    // read project info by project symbol
    ethKanContract.methods.projectInfo(inputProjSymbol).call({from: metaMaskAddr})
    .then(function(projectInfo){
        var info = {
          cardIds: projectInfo[0],
          owner: projectInfo[1]
        }
        $ ('#project-info-result1').html('project_info: ' + JSON.stringify(info));
    });
    // get project owned by my MetaMask selected address
    ethKanContract.methods.myProjects().call({from: metaMaskAddr})
    .then(function(myProjects){
      $ ('#project-info-result2').html('my_projects_ids: ' + myProjects);
    });
    // get count of projects which is also the id of last project created
    ethKanContract.methods.projectCount().call({from: metaMaskAddr})
    .then(function(projectCount){
      $ ('#project-info-result3').html('project_count: ' + projectCount);
    });
  });

  // ui event for create card
  $ ('#create-card').click (function () {
    var inputProjSymbol = $ ('#create-card-input1').val ();
    metaMaskAddr = window.web3.eth.defaultAccount;
    // create new card and add to project
    ethKanContract.methods
      .createCard (inputProjSymbol)
      .send ({from: metaMaskAddr, gas: gasLimit})
      .on('receipt', function(receipt){
        $ ('#create-card-result1').html('created_new_card_for: ' + inputProjSymbol);
      })
      .on('error', console.error);
  });

  // ui event for card info
  $ ('#card-info').click (function () {
    var inputCardId = $ ('#card-info-input1').val ();
    metaMaskAddr = window.web3.eth.defaultAccount;
    // read card info by card id
    ethKanContract.methods.cardInfo(inputCardId).call({from: metaMaskAddr})
    .then(function(cardInfo){
      var info = {
        projectId: cardInfo[0],
        balance: cardInfo[1],
        owner: cardInfo[2],
        claimedBy: cardInfo[3],
        status: cardInfo[4]
      }
      $ ('#card-info-result1').html('card_info: ' + JSON.stringify(info));
    });
    // get cards owned by my MetaMask selected address
    ethKanContract.methods.myCards().call({from: metaMaskAddr})
    .then(function(myCards){
      $ ('#card-info-result2').html('my_card_ids: ' + myCards);
    });
    // get count of cards which is also the id of last card created
    ethKanContract.methods.cardCount().call({from: metaMaskAddr})
    .then(function(cardCount){
      $ ('#card-info-result3').html('card_count: ' + cardCount);
    });
  });

  // ui event for fund card
  $ ('#fund-card').click (function () {
    var inputCardId = $ ('#fund-card-input1').val ();
    var inputAmount = parseInt($ ('#fund-card-input2').val ());
    metaMaskAddr = window.web3.eth.defaultAccount;
    // fund card by calling a method because is less stress full then sending test money
    ethKanContract.methods
      .fundCard (inputCardId, inputAmount)
      .send ({from: metaMaskAddr, gas: gasLimit})
      .on('receipt', function(receipt){
          $ ('#fund-card-result').html('funded_card_id: ' + inputCardId);
      })
      .on('error', console.error);
  });

  // ui event for claim card
  $ ('#claim-card').click (function () {
    var inputCardId = $ ('#claim-card-input1').val ();
    metaMaskAddr = window.web3.eth.defaultAccount;
    // claim card
    ethKanContract.methods
      .claimCard ($ ('#claim-card-input1').val ())
      .send ({from: metaMaskAddr, gas: gasLimit})
      .on('receipt', function(receipt){
        $ ('#claim-card-result').html('claimed_card_id: ' + inputCardId);
      })
      .on('error', console.error);
  });

  // ui event for approve card
  $ ('#approve-card').click (function () {
    var inputCardId = $ ('#approve-card-input1').val ();
    metaMaskAddr = window.web3.eth.defaultAccount;
    // approve card
    ethKanContract.methods
      .approveCard ($ ('#approve-card-input1').val ())
      .send ({from: metaMaskAddr, gas: gasLimit})
      .on('receipt', function(receipt){
        $ ('#approve-card-result').html('approved_card_id: ' + inputCardId);
      })
      .on('error', console.error);
  });

});

// using this more like plain old html because this is just a proof of concept
// and html is easy
class App extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="item">
          <h4>Click a button to create new EthKan project:</h4>
          <div className="item-note">(Cannot create more than one project with same symbol)</div>
          <label>Project token symbol: </label><input id="create-project-input1" type="text" />
          <button id="create-project">Create Project</button>
          <div id="create-project-result1" className="result" />
        </div>
        <br />
        <div className="item readonly">
          <h4>
            Readonly method for project info:
          </h4>
          <div className="item-note">(Project with symbol must exist)</div>
          <label>Project Symbol: </label><input id="project-info-input1" type="text" />
          <button id="project-info">Project Info</button>
          <div id="project-info-result1" className="result" />
          <div id="project-info-result2" className="result" />
          <div id="project-info-result3" className="result" />
        </div>
        <br />
        <div className="item">
          <h4>
            Create card on blockchain by dragging it to "Deployed" swimlane:
          </h4>
          <div className="item-note">(Project with symbol must exist)</div>
          <label>This Card belongs to project token symbol: </label><input id="create-card-input1" type="text" />
          <button id="create-card">Create Card</button>
          <div id="create-card-result1" className="result" />
        </div>
        <br />
        <div className="item readonly">
          <h4>
            Readonly method for card info:
          </h4>
          <div className="item-note">(Card must exist)</div>
          <label>Card ID: </label><input id="card-info-input1" type="text" />
          <button id="card-info">Card Info</button>
          <div id="card-info-result1" className="result" />
          <div id="card-info-result2" className="result" />
          <div id="card-info-result3" className="result" />
        </div>
        <br />
        <div className="item">
          <h4>
            Press button to fund the EthKan Card Contract:
          </h4>
          <div className="item-note">(Can't fund cards with approved status)</div>
          <label>Card ID: </label><input id="fund-card-input1" type="text" />
          <label>Amount: </label><input id="fund-card-input2" type="text" />
          <button id="fund-card">Fund Card</button>
          <div id="fund-card-result" className="result" />
        </div>
        <br />
        <div className="item">
          <h4>
            Drag card to "Claimed" swimlane claims the EthKan Card Contract:
          </h4>
          <div className="item-note">(Card must exist and status cannot be approved)</div>
          <label>Card ID: </label><input id="claim-card-input1" type="text" />
          <button id="claim-card">Claim Card</button>
          <div id="claim-card-result" className="result" />
        </div>
        <br />
        <div className="item">
          <h4>
            Drag card to "Approved" swimlane approves the EthKan Card Contract:
          </h4>
          <div className="item-note">(Card must exist and only the owner of a card can approve it)</div>
          <label>Card ID: </label><input id="approve-card-input1" type="text" />
          <button id="approve-card">Approve Card</button>
          <div id="approve-card-result" className="result" />
        </div>
      </div>
    );
  }
}

export default App;
