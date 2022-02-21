import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  datas$!: Observable<any>;

  constructor( private userService: UsersService ) { }

  ngOnInit(): void {

    this.datas$ = this.userService.getGuest();
  }

}
