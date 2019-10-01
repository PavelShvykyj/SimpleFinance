import { TestBed } from '@angular/core/testing';

import { FbProviderService } from './fb-provider.service';

describe('FbProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FbProviderService = TestBed.get(FbProviderService);
    expect(service).toBeTruthy();
  });
});
