import { Observable } from 'rxjs';
import { ActivitiesService } from './../services/activities.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  constructor(private actserv: ActivitiesService) { }

  datas$: Observable<any> | undefined ;

  ngOnInit(): void {

   this.datas$ =  this.actserv.get();

  }

}
