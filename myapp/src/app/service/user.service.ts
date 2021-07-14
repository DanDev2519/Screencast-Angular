import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable() // декаратор, говорит, что нужно создать сервис _http, который инджектируется
// @Injectable({
//   providedIn: 'root'
// })
export class UserService {

  private userList = [
    {name: 'John'},
    {name: 'Bob'},
    {name: 'Alice'},
  ];

  constructor(private _http: HttpClient) { }

  public getUserList() {
    console.log(this._http.get('https://jsonplaceholder.typicode.com/users'))
    return this._http.get('https://jsonplaceholder.typicode.com/users'); // запрос к серверу
    // return this.userList;
  }

  public remove(name: string) {
    return this.userList = this.userList.filter((user) => user.name !== name);
  }

  public add(name: string) {
    this.userList.push({ name });
  }
}
