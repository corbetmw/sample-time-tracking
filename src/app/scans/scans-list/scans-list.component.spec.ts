import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScansListComponent } from './scans-list.component';

describe('ScansListComponent', () => {
  let component: ScansListComponent;
  let fixture: ComponentFixture<ScansListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScansListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
