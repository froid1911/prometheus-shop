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
    { name: 'Promi P8 Turbo', selected: false, price: 1000 },
    { name: 'Prometheus Schlüsselanhänger', selected: true, price: 1 },
    { name: 'Prometheus P8 Bambini Edition', selected: false, price: 10 }
  ];

  shopItemsSelected;

  title = 'app';
  displayQRCode: boolean;
  disableRipples: boolean;
  price: number;

  constructor(private prometheus: PrometheusService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.displayQRCode = false;
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
    this.displayQRCode = true;
    this.generateQRCode(this.price);
    this.disableRipples = true;
    this.prometheus.subscribeBalance().then((data) => {
      this.dialog.open(TxReceivedComponent).afterClosed().subscribe(() => {
        this.displayQRCode = false;
        this.disableRipples = false;
      });

    });

  }

  finishPayment(tx) {

  }


}
