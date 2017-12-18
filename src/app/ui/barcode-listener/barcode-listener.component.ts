import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { PatternValidator } from '@angular/forms';

@Component({
  selector: 'barcode-listener',
  templateUrl: './barcode-listener.component.html',
  styleUrls: ['./barcode-listener.component.scss']
})
export class BarcodeListenerComponent implements OnInit {
  // our output will be the event emitter
  @Output() scan: EventEmitter<string> = new EventEmitter<string>();
  // Add the listener for the keypress
  @HostListener('document:keypress', ['$event'])
  keypress(e: KeyboardEvent) {
    this.keypressHandler(e);
  }

  currentTime = 0;
  currentTimeDiff = 0;  
  previousTimeDiff = 0;
  currentKey: string
  previousKey: string
  outputString: string = ''

  constructor() { }

  ngOnInit() {

  }

  keypressHandler(e) {
    let timestamp = new Date().getTime();
    this.previousKey = this.currentKey;    
    this.currentKey = e.key;

    if (this.currentTime) {
      this.previousTimeDiff = this.currentTimeDiff;
      this.currentTimeDiff = timestamp - this.currentTime;
    }

    this.currentTime = timestamp;

    //if either the current time diff is less than 15, or the current time diff is less than 15
    //and the previous time diff was greater than 15. This is in the case where there is certainly a longer
    //period between scans
    if ((this.currentTimeDiff <= 15) || (this.currentTimeDiff <= 15 && this.previousTimeDiff >= 25)) {
      //We must initially evaluate the previous and current time diffs. This is how we know a scan has started,
      //because the second time diff will be very low, while the first will be very high, because a human cannot scan 
      //something is less than 15 milliseconds
      if(this.currentTimeDiff <= 15 && this.previousTimeDiff >= 25){
        this.outputString += this.previousKey
        this.outputString += this.currentKey        
      }
    
      //If they are both less than 15, we know we are beyond the first characters, 
      //and we may start only adding the current character. Also, the current code cannot
      //be Enter, because that is when we need to emit the outputString
      if(this.currentTimeDiff <= 15 && this.previousTimeDiff <= 15 && e.code != 13){
        this.outputString += this.currentKey        
      }

      //If we are in the middle of the scan and the code is 13, we can stop adding to the 
      //outputString and emit it instead. We must then set is back to empty for the next scan.
      if(this.currentTimeDiff <= 15 && this.previousTimeDiff <= 15 && e.code == 13){
        this.scan.emit(this.outputString)
        this.outputString = ''        
      }

    }

  }


}
