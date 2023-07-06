import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  

  users:any[]=[];
  constructor(private userService:UserService){

  }
  ngOnInit(): void {
  this.userService.getUser().subscribe((response)=> {
    this.users=response;
  })
  }
}
