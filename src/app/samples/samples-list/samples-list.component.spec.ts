import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesListComponent } from './samples-list.component';

describe('SamplesListComponent', () => {
  let component: SamplesListComponent;
  let fixture: ComponentFixture<SamplesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
