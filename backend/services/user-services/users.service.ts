import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(user:any){
    return this.http.post('http://localhost:3000/users/new',user)         
  }

  readUsers(){
    return this.http.get('http://localhost:3000/users')         
  }

  deleteUsers(id:any){
    return this.http.delete('http://localhost:3000/users/delete/'+id)         
  }

}
