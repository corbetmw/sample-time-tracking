import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from '../../shared/shared.module';

import { ScanService } from './scan.service';
import { ScansListComponent } from '../scans-list/scans-list.component';
// import { ScanFormComponent } from '../scan-form/scan-form.component';
import { ScanDetailComponent } from '../scan-detail/scan-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule
  ],
  declarations: [
   ScansListComponent,
   ScanDetailComponent,
//    ScanFormComponent
  ],
  providers: [
    ScanService
  ]
})
export class ScanModule { }
