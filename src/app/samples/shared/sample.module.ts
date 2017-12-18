import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//the shared module
import { SharedModule } from '../../shared/shared.module';
//Sample and scan items
import { SampleService } from './sample.service';
import { SamplesListComponent } from '../samples-list/samples-list.component';
import { SampleFormComponent } from '../sample-form/sample-form.component';
import { SampleDetailComponent } from '../sample-detail/sample-detail.component';
// import { SamplesOpenTableComponent } from '../samples-open-table/samples-open-table.component';
//scan component
import { ScansListComponent } from '../../scans/scans-list/scans-list.component';
import { ScanDetailComponent } from '../../scans/scan-detail/scan-detail.component';
//Material Module
import { MaterialModule } from '../../material/material.module';
//yo
// import { BarcodeListenerComponent } from '../../ui/barcode-listener/barcode-listener.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
    MaterialModule
  ],
  declarations: [
    SamplesListComponent,
    SampleFormComponent,
    SampleDetailComponent,
    // SamplesOpenTableComponent,    
    // BarcodeListenerComponent
  ],
  providers: [
    SampleService
  ]
})
export class SampleModule { }
