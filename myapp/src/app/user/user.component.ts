import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public selectedUser: any;
  // Декоратор, принимающий свойство user1 bp hjlbntkmcrjq rjvgjytyns
  @Input('user1') admin: any;
  @Input() users: any;

  constructor(private _router: Router, private _route: ActivatedRoute) {
    // ActivatedRoute - текущий путь
    // console.log('constructor', this.admin);

    // для получения параметров из UserResolveService из resolve
    this._route.data.subscribe(data => {
      if (Object.keys(data).length !== 0) console.log('resole', data.user);
    });
  }

  // Это хук, который выполняется после передачи всех данных в компоненту
  ngOnInit(): void {
    // console.log('ngOnInit', this.admin);
  }

  goToUser(userId: number) {
    // this._router.navigate([ userId ], { relativeTo : this._route});

    this._router.navigate(['users', userId], { skipLocationChange : true}).then(() => {});
    // эквивалентная запись
    // this._router.navigateByUrl('users/' + userId, { skipLocationChange : true});

    // skipLocationChange - оставляет неизменным путь в адресной строке
    // relativeTo - будет добавлять абсоолютную часть пути
    // в navigateByUrl '/users/' - / ваереди и путь будет от корня
    // navigateByUrl и  navigate возвращают промис и его тоже можно обрабатывать
  }

}
