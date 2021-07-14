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

  public remove(name: string) {
    return this.userList = this.userList.filter((user) => user.name !== name);
  }

  public add(name: string) {
    this.userList.push({ name });
  }
}
