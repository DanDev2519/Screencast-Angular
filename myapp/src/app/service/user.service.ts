// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class UserService {

  private userList = [
    {name: 'John'},
    {name: 'Bob'},
    {name: 'Alice'},
  ];

  constructor() { }

  public getUserList() {
    return this.userList;
  }
}
