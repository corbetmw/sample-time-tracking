import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { SampleService } from '../shared/sample.service';
import { Sample } from '../shared/sample';
import { Observable } from 'rxjs/Observable';
import { ScanService } from '../../scans/shared/scan.service';
import { MatSort, MatPaginator, MatSortable, MatTableDataSource } from '@angular/material';
import { Scan } from '../../scans/shared/scan';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { async } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'samples-open-table',
  templateUrl: './samples-open-table.component.html',
  styleUrls: ['./samples-open-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SamplesOpenTableComponent implements OnInit {
  showSpinner: boolean = true;
  dataSource = new MatTableDataSource<Scan>();
  displayedColumns = [
    'sampleId',
    'lotNumber',
    'productionNumber',
    'equipment',
    'userName',
    'addInfo',
    'inTime'
  ];


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sampleSvc: SampleService, private scanSvc: ScanService) { }

  ngAfterViewInit() {
    this.sampleSvc.getOpenSamples().subscribe(openSamples => {
      this.dataSource.data = openSamples;
      this.showSpinner = false;
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  checkSampleFromList(event) {
    this.scanSvc.checkScan(event);
    // console.log(event);
    // console.log('scan checked');
  }
}
