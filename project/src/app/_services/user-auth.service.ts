import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []){
    localStorage.setItem('roles', JSON.stringify(roles));
  }


  public getRoles(): []{
   return JSON.parse(localStorage.getItem('roles')!);;
     }

  public setToken(token:string){
     localStorage.setItem('token', token);
    }


  public getToken(){
    return localStorage.getItem('token')
    }


  public clear(){
  localStorage.clear();
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    let roles = localStorage.getItem('roles');
    if ( tokenStr == undefined || tokenStr== '' || tokenStr == null && roles == undefined || roles =='' || roles== null){
      return false;
    } else{
      return true;
    };
  }

  public isAdmin(){
    const roles: any[] = this.getRoles();
   return roles[0].name === "ADMIN";

  }

  public isUser(){
    const roles: any[] = this.getRoles();
   return roles[0].name === "USER";

  }

}

