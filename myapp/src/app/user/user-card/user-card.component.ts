import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input('userCrrent') user: any;
  // Вывод значения переменной по событию
  @Output() currentUserClick: EventEmitter<any> = new EventEmitter();

  constructor(private route: ActivatedRoute) {
    // для получения статических параметров из route
    this.route.data.subscribe(params => {
      if (Object.keys(params).length !== 0) console.log('static', params);
    });

    // для получения параметра userID - параметра запроса
    this.route.params.subscribe(params => {
      if (Object.keys(params).length !== 0) console.log('userID', params);
    });
    // для получения параметра запроса query
    // для вывода в консоль 111 ввести http://localhost:4200/users/15?q=111
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) console.log('query', params);
    });
  }

  ngOnInit(): void {
  }

  // Вывод значения переменной по событию
  selectUser() {
    this.currentUserClick.emit();
  }
}
