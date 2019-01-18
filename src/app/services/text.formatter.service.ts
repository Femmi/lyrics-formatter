import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class TextFormatterService {
  constructor() {}

  formatText(
    text: string,
    useBlockLetters: boolean,
    numberOfBreakLines: number,
    sentencesPerParagraph: number = 1
  ): string {
    let formattedText = '';
    let fileContent = text;

    const breakLines = this.configureBreakLines(numberOfBreakLines);

    if (useBlockLetters) {
      fileContent = _.toUpper(text);
    }

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
      if (index && index % sentencesPerParagraph === 0) {
        formattedText += breakLines + paragraph + '\n';
      } else {
        formattedText += paragraph + '\n';
      }

      formattedText.trim();
    });

    return formattedText;
  }

  private configureBreakLines(count: number) {
    let newLines = '';
    for (let i = 0; i < count; i++) {
      newLines += '\n';
    }
    return newLines;
  }
}
