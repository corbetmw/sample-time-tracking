import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//the shared module
import { SharedModule } from '../../shared/shared.module';
//Kiosk Component
import { KioskComponent } from '../kiosk/kiosk.component';
//scan component
import { ScansListComponent } from '../../scans/scans-list/scans-list.component';
import { ScanDetailComponent } from '../../scans/scan-detail/scan-detail.component';
//Material Module
import { MaterialModule } from '../../material/material.module';
//yo
import { BarcodeListenerComponent } from '../../ui/barcode-listener/barcode-listener.component';
import { SamplesOpenTableComponent } from '../../samples/samples-open-table/samples-open-table.component';

//Scan service for checking samples
import { ScanService } from '../../scans/shared/scan.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    SamplesOpenTableComponent,    
    BarcodeListenerComponent,
    KioskComponent
  ],
  providers: [
    ScanService
  ]
})
export class KioskModule { }
