import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanDetailComponent } from './scan-detail.component';

describe('ScanDetailComponent', () => {
  let component: ScanDetailComponent;
  let fixture: ComponentFixture<ScanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
