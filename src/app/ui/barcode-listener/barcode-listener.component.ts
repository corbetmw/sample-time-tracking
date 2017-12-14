import {Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';
import {PatternValidator} from '@angular/forms';

@Component({
  selector: 'barcode-listener',
  templateUrl: './barcode-listener.component.html',
  styleUrls: ['./barcode-listener.component.scss']
})
export class BarcodeListenerComponent implements OnInit {
  // declare all of our inputs to the component
  @Input() barcodeValueRegExp: string = '';
  @Input() scanDuration: number = 2000;
  @Input() finishScanOnMatch: boolean = true;
  
  // our output will be the event emitter
  @Output() scan: EventEmitter<string> = new EventEmitter<string>();
  
  // Add the listener for the keypress
  @HostListener('document:keydown', ['$event'])
  keypress(e: KeyboardEvent) {
    this.keypressHandler(e);
  }
  
  // these are our global variables
  finishScanTimeoutId: number = 0;
  valueBuffer: string = '';
  barcodeValueTest = new RegExp(this.barcodeValueRegExp);
  barcode: string = '';

  constructor() {}

  ngOnInit() {
    // let barcodePrefix = this.barcodePrefix;  
    let scanDuration = this.scanDuration;
    let finishScanOnMatch = this.finishScanOnMatch;   
    
    if (finishScanOnMatch != null && typeof finishScanOnMatch !== 'boolean') {
      throw new TypeError('finishScanOnMatch must be a boolean');
    }

    if (scanDuration && typeof scanDuration !== 'number') {
      throw new TypeError('scanDuration must be a number');
    }

  }
              
  resetScanState() {
    this.finishScanTimeoutId = null;
    this.valueBuffer = '';
    this.barcode = '';
  }

  keypressHandler(e) {

    let code = (e.keyCode ? e.keyCode : e.which);

    if (code === 13) {

      //console.log("scan detected!");

      let currentBarcode = this.barcode;

      if (this.finishScanOnMatch && this.barcodeValueTest.test(currentBarcode)) {
        clearTimeout(this.finishScanTimeoutId);
        this.scan.emit(currentBarcode);
      }
      else {
        alert("There was an error. IT has been notified.");
      }

      this.resetScanState();

    }else {
      this.barcode += e.key;
      // this.barcode += String.fromCharCode(code);
    }
  }

}
