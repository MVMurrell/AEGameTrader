import { Aepp } from '@aeternity/aepp-sdk/';
import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import Wallet from '@aeternity/aepp-sdk/es/ae/wallet';
import MemoryAccount from '@aeternity/aepp-sdk/es/account/memory';
import { generateKeyPair } from '@aeternity/aepp-sdk/es/utils/crypto';
import contractDetails from '../../../integrations/contractsAeppSettings.js'
// import * as Contract from '@aeternity/aepp-sdk/es/ae/';


@Component({
  selector: 'app-store-front',
  templateUrl: './store-front.component.html',
  styleUrls: ['./store-front.component.css']
})
export class StoreFrontComponent implements OnInit {

  gameArray = [];

  gamesLength = 0;

  sellGame: boolean;

  games: any;

  secretKey;

  publicKey;

  wallet;

  balance;

  client;

  contractInstance;


  contractAddress = "ct_2vxCkM5hyFmQvyoJX4NWDyTLGtArCTqoRMfmaghtZETr2fM6h8";

  constructor() {}

  ngOnInit() {


    this.client = Aepp;

    this.contractInstance =  this.client.getContractInstance( contractDetails.contractSource, {contractAddress: contractDetails.contractAddress})
    const keypair = generateKeyPair();
    this.secretKey = keypair.secretKey;
    this.publicKey = keypair.publicKey;

    const w = Wallet({
      url: 'https://sdk-testnet.aepps.com/',
      accounts: [MemoryAccount({ keypair: { secretKey: this.secretKey.value, publicKey: this.publicKey.value } })],
      address: this.publicKey.value,
      onTx: confirm,
      onChain: confirm,
      onAccount: confirm,
      onContract: confirm,
    });

    this.wallet = w
    // this.contractAddress;
    // function callStatic(func, args) {
    //   var that = this;
    //   //Create a new contract instance that we can interact with
    //   const contract = this.client.getContractInstance(
    //     this.contractSource,
    //     this.contractAddress
    //   );
    //   //Make a call to get data of smart contract func, with specefied arguments
    //   const calledGet = contract
    //     .call(func, args, { callStatic: true })
    //     .catch(e => console.error(e));
    //   //Make another call to decode the data received in first call
    //   const decodedGet = calledGet.decode().catch(e => console.error(e));
    //   console.log('decodedGet', decodedGet)
    //   return decodedGet;
    // }
    this.balance = w.getBalance(this.publicKey.value);
    this.sellGame = false;
    this.renderGames();
  }


   renderGames(){
    this.games = _.orderBy(this.gameArray, "title", "asc");
    // return this.games;
   }

  curses(owner) {
    console.log("get out of hur " + owner);
  }

  openRegisterComp() {
    this.sellGame = true;
  }

  printKey(){
    console.log(this.balance)
  }
}
