import { Component, OnInit, Input } from '@angular/core';
import { ScanService } from '../shared/scan.service';
import { Scan } from '../shared/scan';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'scans-list',
  templateUrl: './scans-list.component.html',
  styleUrls: ['./scans-list.component.scss']
})
export class ScansListComponent implements OnInit {

  @Input() sampleId: string = '';

  scans: any; //FirebaseListObservable<Scan[]>;
  showSpinner: boolean = true;

  constructor(private scanSvc: ScanService) {
    this.scans = this.scanSvc.getScansList()
  }

  ngOnInit() {
    this.scans.subscribe(x => {
      this.showSpinner = false
    })
  }

  checkScanFromList(event) {
    console.log("this is what's being sent to the checkScan service " + event);
    this.scanSvc.checkScan(event);
  }

}
