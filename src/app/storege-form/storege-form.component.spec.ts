import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoregeFormComponent } from './storege-form.component';

describe('StoregeFormComponent', () => {
  let component: StoregeFormComponent;
  let fixture: ComponentFixture<StoregeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoregeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoregeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
