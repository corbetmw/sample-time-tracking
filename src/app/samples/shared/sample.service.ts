import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Sample } from './sample';
import { ScanService } from '../../scans/shared/scan.service';
import { Scan } from '../../scans/shared/scan';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import * as _ from 'lodash';

@Injectable()
export class SampleService {

  private basePath = '/samples';

  samplesRef: AngularFireList<Sample>;
  sampleRef:  AngularFireObject<Sample>;

  samples: Observable<Sample[]>; //  list of objects
  sample:  Observable<Sample>;   //   single object

  scansRef: AngularFireList<Scan>;
  scanRef:  AngularFireObject<Scan>;

  scans: Observable<Scan[]>;
  scan:  Observable<Scan>; 

  constructor(private db: AngularFireDatabase, private scanSvc: ScanService) {
    this.samplesRef = db.list('/samples')
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  
  getSamplesList(query?) {
    // const samplesRef = afDb.list('/samples')
    // return this.samplesRef.valueChanges()
    return this.samplesRef.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }) )
    })
  }

  // Return a single observable sample
  getSample(key: string): Observable<Sample> {
    const samplePath = `${this.basePath}/${key}`;
    this.sample = this.db.object(samplePath).valueChanges();
    return this.sample
  }

  // Create a bramd new sample
  createSample(sample: Sample): void {
    this.samplesRef.push(sample)
  }

  // Update an exisiting sample
  updateSample(key: string, value: any): void {
    this.samplesRef.update(key, value)
  }

  // Deletes a single sample
  deleteSample(key: string): void {
    this.samplesRef.remove(key)
  }

  // Deletes the entire list of samples
  deleteAll(): void {
    this.samplesRef.remove()
  }

  getOpenSamples() {
    let openScans = this.scanSvc.getOpenScans();

    let fullSamples = openScans.map(scans => {
      for (let scan of scans) {
        this.getSample(scan.sampleId).subscribe(sample => {
          scan.lotNumber = sample.lotNumber;
          scan.productionNumber = sample.productionNumber;
          scan.equipment = sample.equipment;
          scan.userName = sample.userName;
          scan.addInfo = sample.addInfo
        })
      }
      return scans;
    });
    
    //fullSamples.subscribe(samples => console.log(samples));
    return fullSamples;
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }

  // getOpenSamples() {
  //   let openScans = this.scanSvc.getOpenScans();

  //   let fullSamples = openScans.map(scans => {
  //     for (let scan of scans) {
  //       scan.sample = this.getSample(scan.sampleId);
  //     }
  //     return scans;
  //   });
    
  //   //fullSamples.subscribe(samples => console.log(samples));
  //   return fullSamples;
  // }

  // // Default error handling for all actions
  // private handleError(error) {
  //   console.log(error)
  // }


}