import { Injectable } from '@angular/core';
import { default as EthereumQRPlugin } from 'ethereum-qr-code';
import { default as Web3 } from 'web3';
declare var require: any;
const TokenArtifact = require('./../assets/contracts/PrometheusToken.json');
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class PrometheusService {

  private static SHOP_ADDRESS = '0x584bfc3769d88078109277d1435f86c1051b770f';

  // rinkeby
  private static NETWORK_ID = 4;
  private static WEB3_PROVIDER = 'wss://rinkeby.infura.io/_ws';

  private qr: EthereumQRPlugin;
  private web3: Web3;
  private tokenContract: any;

  private balanceEmitter = new EventEmitter();

  constructor() {
    this.qr = new EthereumQRPlugin();
    this.web3 = new Web3(PrometheusService.WEB3_PROVIDER);
    this.tokenContract = new this.web3.eth.Contract(TokenArtifact.abi, TokenArtifact.networks[PrometheusService.NETWORK_ID].address);
    this.subscribeBalance();
  }

  subscribeBalance() {
    return new Promise((resolve) => {
      this.web3.eth.getBlockNumber().then((blocknumber) => {
        this.tokenContract.once('Transfer', { filter: { fromBlock: blocknumber, to: PrometheusService.SHOP_ADDRESS } }, (error, event) => {
          resolve(event);
        });
      });
    });
  }

  generateQRCode(amount: number) {
    console.log(amount, PrometheusService.SHOP_ADDRESS);
    return this.qr.toCanvas(
      {
        'to': TokenArtifact.networks[PrometheusService.NETWORK_ID].address,
        'mode': 'erc20__transfer',
        'argsDefaults': [
          {
            'name': 'to',
            'value': PrometheusService.SHOP_ADDRESS
          },
          {
            'name': 'value',
            'value': amount + ''
          }
        ]
      }, {
        selector: '#qr-code',
      });
  }


}
