import { Component, OnInit, Input } from '@angular/core';
import { ScanService } from '../shared/scan.service';
import { Scan } from '../shared/scan';

@Component({
  selector: 'scan-detail',
  templateUrl: './scan-detail.component.html',
  styleUrls: ['./scan-detail.component.scss']
})
export class ScanDetailComponent implements OnInit {

  @Input() scan: Scan;

  constructor(private scanSvc: ScanService) { }

  ngOnInit() {
  }

//  updateDatePrinted() {
//    let date = new Date()
//    this.scanSvc.updateScan(this.scan.$key, { datePrinted: date })
//  }
//
//  updateInTime() {
//    let date = new Date()
//    this.scanSvc.updateScan(this.scan.$key, { inTime: date })
//  }
//
//  deleteScan() {
//    this.scanSvc.deleteScan(this.scan.$key)
//  }

}
