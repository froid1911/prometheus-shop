import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatButtonModule, MatListModule, MatSelectModule, MatDialogModule, MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TxReceivedComponent } from '../dialogs/tx-received/tx-received.component';

@NgModule({
  declarations: [
    AppComponent,
    TxReceivedComponent
  ],
  entryComponents: [
    TxReceivedComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule, MatListModule, MatSelectModule, BrowserAnimationsModule, MatButtonModule, MatDialogModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
