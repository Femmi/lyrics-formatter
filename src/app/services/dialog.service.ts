import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DialogViewComponent } from '../shared/dialog/dialog.view.component';
import { TextFormatterService } from './text.formatter.service';
import { Configuration } from '../models/configuration.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    private textFormatService: TextFormatterService
  ) {}

  dialogRef: MatDialogRef<DialogViewComponent> = null;

  openDialog(config: Configuration): MatDialogRef<DialogViewComponent> {
    this.dialogRef = this.dialog.open(DialogViewComponent, {
      height: '615px',
      width: '600px',
      panelClass: 'custom-modal-box',
      position: { top: '5%' },
      disableClose: true,
      // passing data into the Dialog component
      data: config,
    });

    return this.dialogRef;
  }
}
