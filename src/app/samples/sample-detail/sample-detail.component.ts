import { Component, OnInit, Input } from '@angular/core';
import { SampleService } from '../shared/sample.service';
import { Sample } from '../shared/sample';

@Component({
  selector: 'sample-detail',
  templateUrl: './sample-detail.component.html',
  styleUrls: ['./sample-detail.component.scss']
})
export class SampleDetailComponent implements OnInit {

  @Input() sample: Sample;

  constructor(private sampleSvc: SampleService) { }

  ngOnInit() {
  }

  updateDatePrinted() {
    let date = new Date();
    this.sampleSvc.updateSample(this.sample.$key, { datePrinted: date });
  }

  updateInTime() {
    let date = new Date()
    this.sampleSvc.updateSample(this.sample.$key, { inTime: date });
  }

  deleteSample() {
    this.sampleSvc.deleteSample(this.sample.$key);
  }

}
