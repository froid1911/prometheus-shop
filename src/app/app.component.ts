import { Component, OnInit } from '@angular/core';
import { PrometheusService } from './prometheus.service';
import { MatDialog } from '@angular/material';
import { TxReceivedComponent } from '../dialogs/tx-received/tx-received.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  shopItems = [
    { name: 'Audi R8 Turbo', selected: false, price: 1000 },
    { name: 'Audi R8 Schlüsselanhänger', selected: true, price: 1 },
    { name: 'Audi R8 Bambini Edition', selected: false, price: 10 }
  ];

  shopItemsSelected;

  title = 'app';
  hideQRCode: boolean;
  disableRipples: boolean;
  price: number;

  constructor(private prometheus: PrometheusService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.hideQRCode = true;
    this.disableRipples = false;
  }

  generateQRCode(amount: number) {
    return this.prometheus.generateQRCode(amount);
  }

  getPrice(selected) {
    let price = 0;
    selected.selectedOptions.selected.forEach(element => {
      price += element.value;
    });
    this.price = price;
    return price;
  }

  startPayment() {
    this.prometheus.subscribeBalance().then(this.finishPayment);
    this.hideQRCode = false;
    this.generateQRCode(this.price);
    this.disableRipples = true;
    this.prometheus.subscribeBalance().then((data) => {
      this.dialog.open(TxReceivedComponent).afterClosed().subscribe(() => {
        this.hideQRCode = true;
        this.disableRipples = false;
      });

    });

  }

  finishPayment(tx) {

  }


}
