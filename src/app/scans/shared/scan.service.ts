import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Scan } from './scan';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import * as firebase from 'firebase';
import { SampleService } from 'app/samples/shared/sample.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ScanService {

  private basePath = '/scans';

  scansRef: AngularFireList<Scan>;
  scanRef: AngularFireObject<Scan>;

  scans: Observable<Scan[]>; //  list of objects
  scan: Observable<Scan>;   //   single object


  constructor(private db: AngularFireDatabase, private http: HttpClient) {
    this.scansRef = db.list('/scans')
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getScansList(query?) {
    // return this.scansRef.valueChanges()
    return this.scansRef.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }))
    })
  }

  // Return a single observable scan
  getScan(key: string): Observable<Scan> {
    const scanPath = `${this.basePath}/${key}`;
    this.scan = this.db.object(scanPath).valueChanges();
    return this.scan
  }

  // Create a bramd new scan
  createScan(scan): void {
    this.scansRef.push(scan)
  }

  // Update an exisiting scan
  updateScan(key: string, value: any): void {
    try {
      this.scansRef.update(key, value)
    } catch (error) {
      this.handleError(error);
    }

  }

  // Deletes a single scan
  deleteScan(key: string): void {
    try {
      this.scansRef.remove(key)
    } catch (error) {
      this.handleError(error);
    }
  }

  // If scan is not clocked in, clock it in
  punchScanIn(sampleId: string, taskId?: string) {
    try {
      let scan = {
        sampleId: sampleId,
        inTime: firebase.database.ServerValue.TIMESTAMP
      }
      this.createScan(scan);

      //Execute Close BPM Task REST Call here
      if(taskId){
        this.closeBpmTask(taskId);
      }

    } catch (error) {
      this.handleError(error);
    }

  }

  // If scan is clocked in, clock it out
  punchScanOut(key: string) {
    try {
      this.updateScan(key, {
        outTime: firebase.database.ServerValue.TIMESTAMP
      });

    } catch (error) {
      this.handleError(error);
    }
  }

  //Given a sampleId, this functions searchs the Scans
  //to find the latest scan for that sample
  getLatestScanForSample(sampleId: string) {
    const latestScan = this.db.list('/scans', ref => ref.orderByChild('sampleId').equalTo(sampleId).limitToLast(1));
    return latestScan.snapshotChanges().take(1).map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }))
    })
  }

  getOpenScans() {
    const scansList = this.db.list('/scans', ref => ref.orderByChild('outTime').endAt(null));
    return scansList.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(snap.payload.val(), { $key: snap.key }))
    })
  }

  closeBpmTask(taskId: string) {

    const username = ''
    const password = ''
    const url = `http://shco-bpms-dev3:9080/rest/bpm/federated/htm/v1/task/` + taskId + `?action=complete&systemID=aaa8b298-8de6-4af6-b4a1-ba81f110caca`

    const httpOptions = {
      headers: new HttpHeaders({ 
      'Content-Type': 'application/json', 
      "Authorization": "Basic " + btoa(username + ":" + password)})
    };

    return this.http.put(url, "", httpOptions).subscribe(data => {
      console.log("BPM task successfully closed")
    })

  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }

}
