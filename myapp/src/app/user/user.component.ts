import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {
    // console.log('constructor', this.admin);
  }

  // Это хук, который выполняется после передачи всех данных в компоненту
  ngOnInit(): void {
    // console.log('ngOnInit', this.admin);
  }

}
