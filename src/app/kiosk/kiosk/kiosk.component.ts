import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScanService } from '../../scans/shared/scan.service';

@Component({
  selector: 'kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KioskComponent implements OnInit {

  constructor(private scanSvc: ScanService) { }

  ngOnInit() {
  }

  simulateKeyPress(key, code) {

    let event = new KeyboardEvent('keypress', {
        code: code,
        key: key,
    });

    document.dispatchEvent(event);

  }

  simulateScan() {  
    let sampleId = '31475'
    length = sampleId.length

    for (let i=0; i < length + 1; i++) {
      if(i != length){
        let currentKey = sampleId.charAt(i);
        let currentKeyCode = sampleId.charCodeAt(i);
        this.simulateKeyPress(currentKey,currentKeyCode);
      }else{
        this.simulateKeyPress('enter', 13);
      }
    }

    for (let i = 0, len = sampleId.length +1; i < len; i++) {


    }
  }

  checkSampleFromList(event) {
    this.scanSvc.checkScan(event);
    // console.log(event);
    // console.log('scan checked');
  }

}
