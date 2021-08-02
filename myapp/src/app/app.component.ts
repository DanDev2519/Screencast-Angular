import { Observable, of } from 'rxjs';
import { UserService } from './service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'myapp';
  // nameColor!: FormControl;
  nameColor: FormControl = new FormControl('tomato', [
    Validators.required,
    Validators.maxLength(10),
    myValidator(2)
  ], [
    // myAsyncValidator,// асинхронный валидатор
  ]);
  userID = 15;
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
    // this.userList = this._userService.getUserList();

    // происходит подписка и полученные пользователи записываются в переменную
    this._userService.getUserList().subscribe(users => this.userList = users);

    // this.nameColor.valueChanges.subscribe((value) => console.log(value));
    this.nameColor.statusChanges.subscribe((status) => {
      this.nameColor.errors && console.log(this.nameColor.errors);
      // console.log(status);
    });
  }

  removeUser(name: string) {
    this._userService.remove(name);
    this.userList = this._userService.getUserList();
  }

  addUser(name: string) {
    if (!name) {
      return;
    }
    this._userService.add(name);
    this.userList = this._userService.getUserList();
  }
}

// функции валидации
function myValidator(number: number) {
  return function (formControl: FormControl) {
    if (formControl.value.length < number) {
      return { myValidator: {
        message: `Length less than ${number}`,
        requiredLength: number,
        actualLength: formControl.value.length
      } };
    }
    return null;
  }
}

function myAsyncValidator(formControl: FormControl): Observable<null|any> {
  if (formControl.value.length < 3) {
    return of({ myAsyncValidator: { message: 'Asyc: Length less than 3'} });
  }
  return of(null);
}
