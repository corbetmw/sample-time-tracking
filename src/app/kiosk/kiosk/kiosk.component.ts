import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ScanService } from '../../scans/shared/scan.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KioskComponent implements OnInit {
  @ViewChild('punchButton', { read: ElementRef }) punchButton: ElementRef;

  sampleId: string = '';

  constructor(private scanSvc: ScanService) { 
    
  }

  ngOnInit() {
  }

  populateInput(sampleId) {
    this.sampleId = sampleId;
    let clickButtonEvent = new MouseEvent('click', { bubbles: true });
    this.punchButton.nativeElement.dispatchEvent(clickButtonEvent);

    setTimeout(() => {
      this.sampleId = ''
    },2000);

  }

  simulateKeyPress(key, code) {
    let event = new KeyboardEvent('keypress', {
      code: code,
      key: key,
    });
    document.dispatchEvent(event);
  }

  simulateScan() {
    let simSampleId = '31475'
    length = simSampleId.length

    for (let i = 0; i < length + 1; i++) {
      if (i != length) {
        let currentKey = simSampleId.charAt(i);
        let currentKeyCode = simSampleId.charCodeAt(i);
        this.simulateKeyPress(currentKey, currentKeyCode);
      } else {
        this.simulateKeyPress('enter', 13);
      }
    }

  }

  checkSampleFromList(event) {
    this.scanSvc.checkScan(event);
  }

}
