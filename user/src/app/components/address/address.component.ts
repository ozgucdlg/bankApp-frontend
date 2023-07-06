import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit{

  users:any[]=[];
  constructor(private UserService:UserService){

  }
  ngOnInit(): void {
  this.UserService.getUser().subscribe((response)=> {
    this.users=response;
  })
  }

}
