import { Component, OnInit } from '@angular/core';

import { DialogService } from '../services/dialog.service';
import { Configuration } from '../models/configuration.model';

import * as _ from 'lodash';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  private file: File = null;
  breakLinesCount = 1;
  sentencesPerParagraph = 1;
  convertToUpperCase = false;
  formattedText: string;

  config: Configuration;

  ngOnInit() {}

  openDialog() {
    this.config = {
      convertToBlockLetters: this.convertToUpperCase,
      lineBreaks: this.breakLinesCount,
      sentenceBlocks: this.sentencesPerParagraph,
    };

    this.dialogService.openDialog(this.config);
  }
}
