import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public errorMessage:string="";
  public username:string;
  public password:string;

  constructor(private router:Router){}

  ngOnInit(): void {
    this.login;
  }

  login(form:any){
    if(form.valid){
      if(this.username==="admin" && this.password==="12345"){
        this.router.navigateByUrl("random");
      }
      else{
        this.errorMessage="there is an error";
      }
      
    }else{
      this.errorMessage="please make sure password and usernae is correct"
    }

}
}
