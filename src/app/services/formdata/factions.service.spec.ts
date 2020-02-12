import { TestBed } from '@angular/core/testing';

import { FactionsService } from './factions.service';

describe('FactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactionsService = TestBed.get(FactionsService);
    expect(service).toBeTruthy();
  });
});
