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
  private breakLinesCount = 1;
  private sentencesPerParagraph = 1;
  isChecked: boolean;
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
      console.log(fileLoaded);
      const fileContent = this.isChecked
        ? _.toUpper((<FileReader>fileLoaded.target).result)
        : (<FileReader>fileLoaded.target).result;

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
