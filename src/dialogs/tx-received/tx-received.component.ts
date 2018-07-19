import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-tx-received',
    templateUrl: 'tx-received.component.html',
})
export class TxReceivedComponent {

    constructor(public dialogRef: MatDialogRef<TxReceivedComponent>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
