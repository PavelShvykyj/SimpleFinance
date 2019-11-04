import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActionDialogComponent } from './update-action-dialog.component';

describe('UpdateActionDialogComponent', () => {
  let component: UpdateActionDialogComponent;
  let fixture: ComponentFixture<UpdateActionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateActionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
