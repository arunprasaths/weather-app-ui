import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, pipe, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtUser, User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticatedUser: Subject<JwtUser> = new Subject<JwtUser>();
  authenticatedUser$ = this.authenticatedUser.asObservable();

  isUserAuthenticated: Subject<boolean> = new Subject<boolean>();
  isUserAuthenticated$ = this.isUserAuthenticated.asObservable();

  register(user:any){
    return this.http.post(`${environment.authBaseUrl}/register`, user);
  }

  login(user:any){
    return this.http.post(`${environment.authBaseUrl}/login`, user);
  }

  setLocalStorage(data:JwtUser):void{     
    localStorage.setItem('userName',data.UserName);
    localStorage.setItem('token_value',data.Token);
    localStorage.setItem('name',data.Name);
  }

  clearLocalStorage():void{
    localStorage.removeItem('userName');
    localStorage.removeItem('token_value');
    localStorage.removeItem('name');
  }

  setAuthenticatedUser(user: JwtUser): void {
    this.authenticatedUser.next(user);
  }

  logout(){
    this.clearLocalStorage();   
  }

  get isAuthenticated(){
    return !!localStorage.getItem('token_value');
  }

}
