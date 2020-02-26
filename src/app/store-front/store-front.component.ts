import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
import { Wallet} from '@aeternity/aepp-sdk/';
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

  wallet = Wallet

  contractAddress = "ct_2vxCkM5hyFmQvyoJX4NWDyTLGtArCTqoRMfmaghtZETr2fM6h8";

  constructor() {}

  ngOnInit() {

    console.log(this.wallet);
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
}
