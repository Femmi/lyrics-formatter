import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TextFormatterService } from '../../services/text.formatter.service';
import { Configuration } from 'src/app/models/configuration.model';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-dialog.view',
  templateUrl: './dialog.view.component.html',
  styleUrls: ['./dialog.view.component.css'],
})
export class DialogViewComponent {
  constructor(
    private snackBar: SnackBarService,
    private textFormatService: TextFormatterService,
    @Inject(MAT_DIALOG_DATA) public data: Configuration
  ) {}

  textContent: string;
  isFileProcessed = false;

  clearWindowContent(): void {
    this.textContent = '';
    this.isFileProcessed = false;
  }

  processFile(message: string) {
    if (this.textContent == null || this.textContent.trim().length === 0) {
      this.snackBar.openSnackBar('Please insert text in the window above...');
      this.textContent = '';
      return;
    }
    const formattedText = this.textFormatService.formatText(
      this.textContent,
      this.data.convertToBlockLetters,
      this.data.lineBreaks,
      this.data.sentenceBlocks
    );
    this.isFileProcessed = true;
    this.textContent = formattedText;
    this.snackBar.openSnackBar(message);
  }

  copyToClipBoard(textArea: HTMLTextAreaElement) {
    textArea.select();
    document.execCommand('copy');
    textArea.setSelectionRange(0, 0);

    this.snackBar.openSnackBar('Text copied to clipboard.');
  }
}
