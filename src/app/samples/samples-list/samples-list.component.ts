import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SampleService } from '../shared/sample.service';
import { Sample } from '../shared/sample';
import { Observable } from 'rxjs/Observable';
import { ScanService } from '../../scans/shared/scan.service';
import { Scan } from '../../scans/shared/scan';
import { async } from '@angular/core/testing';


@Component({
  selector: 'samples-list',
  templateUrl: './samples-list.component.html',
  styleUrls: ['./samples-list.component.scss']
})
export class SamplesListComponent implements OnInit {

  constructor(private sampleSvc: SampleService, private scanSvc: ScanService) { }

  ngAfterViewInit() {

  }

  ngOnInit() {

  }


  //Not currently being used. Cannot get the datasource to 
  //update the table
  getOpenSamplesArray() {
    // const openSamplesArray: OpenSample[] = [];
    // this.sampleSvc.getOpenSamples()
    //   .subscribe(openScans => {
    //     for(let openScan of openScans){
    //       openScan.sample.subscribe(sample => {
    //         const currentOpenSample: OpenSample = {
    //             sampleId: openScan.sampleId,
    //             lotNumber: sample.lotNumber,
    //             productionNumber: sample.productionNumber,
    //             equipment: sample.equipment,
    //             inTime: openScan.inTime
    //         }
    //         openSamplesArray.push(currentOpenSample);
    //       });
    //     }
    //   });

    //  console.log(openSamplesArray);
    // return openSamplesArray;
  }

}

