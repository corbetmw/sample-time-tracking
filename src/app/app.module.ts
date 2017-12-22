import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Core
import { CoreModule } from './core/core.module';

// Shared/Widget
import { SharedModule } from './shared/shared.module'

// Feature Modules
import { SampleModule } from './samples/shared/sample.module';
import { ScanModule } from './scans/shared/scan.module';
import { KioskModule } from './kiosk/shared/kiosk.module';
import { UiModule } from './ui/shared/ui.module';
//End Feature Modules

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,    
    HttpModule,
    FormsModule,
    MaterialModule, 
    BrowserAnimationsModule,   
    AppRoutingModule,
    CoreModule,
    SharedModule,
    SampleModule,
    ScanModule,
    UiModule,
    KioskModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
