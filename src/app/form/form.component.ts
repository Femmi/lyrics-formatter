import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor() {}

  private file: File = null;
  breakLinesCount = 1;
  sentencesPerParagraph = 1;
  covertToUpperCase: boolean;
  formattedText: string;

  ngOnInit() {}

  loadFileAsText(event: MouseEvent) {
    if (this.file === null) {
      alert('Please select a file.');
      return;
    }

    this.formattedText = '';

    const breakLines = this.configureBreakLines(this.breakLinesCount);

    const fileReader = new FileReader();

    fileReader.onload = fileLoaded => {
      let fileContent = this.covertToUpperCase
        ? _.toUpper((<FileReader>fileLoaded.target).result)
        : (<FileReader>fileLoaded.target).result;

      // https://stackoverflow.com/questions/9401312/how-to-replace-curly-quotation-marks-in-a-string-using-javascript
      // right single quote gets corrupted while parsing and later returned as unknown unicode after reading text file.
      // replaced suspected characters before processing file content to resolve the issue.
      // tslint:disable-next-line:quotemark
      fileContent = fileContent
        // tslint:disable-next-line:quotemark
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2013\u2014]/g, '-')
        .replace(/[\u2026]/g, '...');

      const arrayOfParagraphs = _.split(fileContent, '\n');

      const filteredArrayOfParagraphs = _.filter(arrayOfParagraphs, val => {
        return val.length > 1;
      });

      filteredArrayOfParagraphs.forEach((paragraph, index) => {
        if (index && index % this.sentencesPerParagraph === 0) {
          this.formattedText += breakLines + paragraph + '\n';
        } else {
          this.formattedText += paragraph + '\n';
        }

        this.formattedText.trim();
      });

      this.saveTextAsFile(this.formattedText, this.file.name);
    };

    fileReader.readAsText(this.file, 'UTF-8');
  }

  configureBreakLines(count) {
    let newLines = '';
    for (let i = 0; i < count; i++) {
      newLines += '\n';
    }
    return newLines;
  }

  fileInputChange(event: MouseEvent) {
    this.file = null;

    this.file = (<HTMLInputElement>event.target).files[0];

    if (this.file.size === 0) {
      alert('The file selected is empty.');
      return;
    }
  }

  checkValue(event: any) {}

  saveTextAsFile(formattedText, fileName) {
    const textToSaveAsBlob = new Blob([formattedText], { type: 'text/plain' });
    const textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    const fileNameToSaveAs = 'Formatted_Text_' + fileName;

    const downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = 'Download File';
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = this.destroyClickedElement;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);

    downloadLink.click();
  }

  destroyClickedElement(event) {
    document.body.removeChild(event.target);
  }
}
