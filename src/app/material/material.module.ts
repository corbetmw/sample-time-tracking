import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatListModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule   
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,  
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule    
  ]
})
export class MaterialModule {}
