import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../components/model/user';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  apiUrl="https://jsonplaceholder.typicode.com/users"

  constructor(private httpClient:HttpClient) { }
  ngOnInit(): void {
   this.getUser();
  }

  getUser():Observable<User[]>{
    return this.httpClient.get<User[]>(this.apiUrl);
  }
}
