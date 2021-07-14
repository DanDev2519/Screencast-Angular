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

  constructor(private _http: HttpClient) {
    // Запрос, который вернет ошибку 401
    // _http.get('https://api.github.com/user').subscribe(result => {
    //   console.log(result);
    // });
   }

  public getUserList() {
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
