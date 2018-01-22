import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { SampleService } from '../shared/sample.service';
import { Sample } from '../shared/sample';
import { Observable } from 'rxjs/Observable';
import { ScanService } from '../../scans/shared/scan.service';
import { MatSort, MatPaginator, MatSortable, MatTableDataSource, MatDialog } from '@angular/material';
import { Scan } from '../../scans/shared/scan';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { async } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { SampleScanService } from 'app/shared/sample-scan.service';
import { ScanResponseDialogComponent } from 'app/kiosk/scan-response-dialog/scan-response-dialog.component';

@Component({
  selector: 'samples-open-table',
  templateUrl: './samples-open-table.component.html',
  styleUrls: ['./samples-open-table.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class SamplesOpenTableComponent implements OnInit {
  success;
  scanState;
  showSpinner: boolean = true;
  dataSource = new MatTableDataSource<Scan>();
  displayedColumns = [
    'sampleId',
    'lotNumber',
    'productionNumber',
    'color',
    'equipment',
    'userName',
    'addInfo',
    'inTime',
    'punch'
  ];


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sampleScanSvc: SampleScanService, public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.sampleScanSvc.getOpenSamples().subscribe(openSamples => {
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

  checkSampleFromList(sampleId) {
    if (event) {
      this.sampleScanSvc.checkScan(sampleId)
        .subscribe(sample => {

          if (sample) {
            //console.log('sample found')
            this.success = true;
            this.scanState = 'Sample ' + sampleId + ' was scanned successfully!'
            
          } else {
            //console.log('it failed')
            this.success = false;
            this.scanState = 'Sample ' + sampleId + ' is not a sample!'
          }

          this.openDialog()
          setTimeout(() => {
            this.closeDialog()
          }, 1750);

        },
        (error) => {
          console.log(error)
        },
        () => {

        })
    } else {
      this.success = false;
      this.scanState = 'You must provide a sample ID to punch!'
      this.openDialog()
      setTimeout(() => {
        this.closeDialog()
      }, 1750);
    }

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ScanResponseDialogComponent, {
      width: '450px',
      height: '400px',
      data: { scanState: this.scanState, success: this.success }
    });
  }

  closeDialog(): void {
    let dialogRef = this.dialog.closeAll();
  }


}
