import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input('userCrrent') user: any;
  // Вывод значения переменной по событию
  @Output() currentUserClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // Вывод значения переменной по событию
  selectUser() {
    this.currentUserClick.emit();
  }
}
