import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesOpenTableComponent } from './samples-open-table.component';

describe('SamplesOpenTableComponent', () => {
  let component: SamplesOpenTableComponent;
  let fixture: ComponentFixture<SamplesOpenTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplesOpenTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesOpenTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
