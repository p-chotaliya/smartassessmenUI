import { TestBed } from '@angular/core/testing';

import { CreateQuestionService } from './create-question.service';

describe('CreateQuestionService', () => {
  let service: CreateQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
