import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Scan } from '../scans/shared/scan';
import { Observable } from 'rxjs/Observable';
import { SampleService } from 'app/samples/shared/sample.service';
import { Sample } from '../samples/shared/sample';
import { ScanService } from '../scans/shared/scan.service';
import * as _ from 'lodash';
import * as firebase from 'firebase';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/catch';


@Injectable()
export class SampleScanService {

  samplesRef: AngularFireList<Sample>;
  sampleRef: AngularFireObject<Sample>;

  samples: Observable<Sample[]>; //  list of objects
  sample: Observable<Sample>;   //   single object

  scansRef: AngularFireList<Scan>;
  scanRef: AngularFireObject<Scan>;

  scans: Observable<Scan[]>;
  scan: Observable<Scan>;

  constructor(private sampleSvc: SampleService, private scanSvc: ScanService) { }


  // Get scan id and see if it's clocked in or not
  checkScan(sampleId: string) {

    this.sample = this.sampleSvc.getSample(sampleId);

    this.sample.subscribe(sample => {
      if (sample) {
          let lastestScan = this.scanSvc.getLatestScanForSample(sampleId);
          lastestScan.subscribe(scans => {
            let currentScan = scans[0];
            if (currentScan === undefined) {
              this.scanSvc.punchScanIn(sampleId);
              status = 'in'
            } else if (currentScan.outTime) {
              this.scanSvc.punchScanIn(sampleId);
              status = 'in'
            } else {
              this.scanSvc.punchScanOut(currentScan.$key);
              status = 'out'
            }
          });
      } else {
        console.log('Sample ' + sampleId + ' does not exist')
      }
    })

    return this.sample;
    
  }

  getOpenSamples() {
    try {
      let openScans = this.scanSvc.getOpenScans();

      let fullSamples = openScans.map(scans => {
        for (let scan of scans) {
          this.sampleSvc.getSample(scan.sampleId).subscribe(sample => {
            scan.lotNumber = sample.lotNumber;
            scan.productionNumber = sample.productionNumber;
            scan.color = sample.color;
            scan.equipment = sample.equipment;
            scan.userName = sample.userName;
            scan.addInfo = sample.addInfo
          })
        }
        return scans;
      });

      //fullSamples.subscribe(samples => console.log(samples));
      return fullSamples;
    } catch (error) {
      throw error
    }
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }

}
