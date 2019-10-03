import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoregesComponent } from './storeges.component';

describe('StoregesComponent', () => {
  let component: StoregesComponent;
  let fixture: ComponentFixture<StoregesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoregesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoregesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
