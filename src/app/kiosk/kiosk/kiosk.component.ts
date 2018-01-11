import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Renderer, Inject } from '@angular/core';
import { ScanService } from '../../scans/shared/scan.service';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ScanResponseDialogComponent } from 'app/kiosk/scan-response-dialog/scan-response-dialog.component';
import { SampleScanService } from 'app/shared/sample-scan.service';
import { environment } from '.../../environments/environment';
import 'rxjs/add/operator/finally';


@Component({
  selector: 'kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: []
})
export class KioskComponent implements OnInit {
  @ViewChild('punchButton', { read: ElementRef }) punchButton: ElementRef;
  sampleIdInput = new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]);

  sampleId: string = '';
  state: string = ''
  scanState: string = '';
  success: boolean = true;
  isProduction = environment.production;

  constructor(private sampleScanSvc: SampleScanService, public dialog: MatDialog) {

  }

  ngOnInit() {
  }

  populateInput(sampleId) {
    this.sampleId = '';
    this.sampleId = sampleId;
    let clickButtonEvent = new MouseEvent('click', { bubbles: true });
    this.punchButton.nativeElement.dispatchEvent(clickButtonEvent);
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
        this.simulateKeyPress('Enter', 'Enter');
      }
    }

  }

  getErrorMessage() {
    return this.sampleIdInput.hasError('required') ? 'You must enter a sample Id' :
      this.sampleIdInput.hasError('pattern') ? 'Not a valid sample Id. Must be all numbers' :
        '';
  }

  checkSampleFromList(sampleId) {
    if(sampleId){
        this.sampleScanSvc.checkScan(sampleId)
      .subscribe(sample => {

        if (sample) {
          //console.log('sample found')
          this.success = true;
          this.scanState = 'Sample ' + this.sampleId + ' was scanned successfully!'
        } else {
          //console.log('it failed')
          this.success = false;
          this.scanState = 'Sample ' + this.sampleId + ' is not a sample!'
        }

        this.openDialog()
        setTimeout(() => {
          this.closeDialog()
          this.sampleId = ''
        }, 1750);

      },
      (error) => {
        console.log(error)
      },
      () => {

      })  
    }else{
      this.success = false;
      this.scanState = 'You must provide a sample ID to punch!'
      this.openDialog()
      setTimeout(() => {
        this.closeDialog()
        this.sampleId = ''
      }, 1750);
    }

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ScanResponseDialogComponent, {
      width:'450px',
      height:'400px',      
      data: { scanState: this.scanState, success: this.success }
    });
  }

  closeDialog(): void {
    let dialogRef = this.dialog.closeAll();
  }

}

