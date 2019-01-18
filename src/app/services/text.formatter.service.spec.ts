import { TestBed } from '@angular/core/testing';

import { TextFormatterService } from './text.formatter.service';

describe('Text.FormatterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextFormatterService = TestBed.get(TextFormatterService);
    expect(service).toBeTruthy();
  });
});
