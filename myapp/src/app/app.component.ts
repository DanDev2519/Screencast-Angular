import { UserService } from './service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'myapp';
  public name = 'Ben';
  public colorClass = 'tomato';
  public colorClick = 'aqua';
  public colorNewClick = 'pink';
  public inputText = '';
  public fontSize = 45;
  public user = {
    name: this.name,
  };
  // public userList = [
    //   {name: this.name},
    //   {name: 'Bob'},
    //   {name: 'Alice'},
    // ];
  public userList: any;
  public isShowUser = true;
  private timeoutColor = 1000;

  // внедрение зависимостей - сервис users
        // полная версия
        // private _userService;
        // constructor(userService: UserService) {
        //   this._userService = userService;
        // сокращенная версия
  constructor(private _userService: UserService) {

    setTimeout(() => {
      this.colorClass = 'green';
      // this.fontSize = 30;
      // this.user = {
      //   name: this.name,
      // }

      setTimeout(() => {
        this.colorClass = 'blue';
        // this.fontSize = 50;
      }, this.timeoutColor);
    }, this.timeoutColor);
  }

  changeColor(color: string = 'black') {
    this.colorClick = color;
  }

  ngOnInit() {
    // берем список пользователей из сервиса
    this.userList = this._userService.getUserList();
  }
}
