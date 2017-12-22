import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanResponseDialogComponent } from './scan-response-dialog.component';

describe('ScanResponseDialogComponent', () => {
  let component: ScanResponseDialogComponent;
  let fixture: ComponentFixture<ScanResponseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanResponseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
