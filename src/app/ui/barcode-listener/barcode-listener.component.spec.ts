import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeListenerComponent } from './barcode-listener.component';

describe('BarcodeListenerComponent', () => {
  let component: BarcodeListenerComponent;
  let fixture: ComponentFixture<BarcodeListenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeListenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
