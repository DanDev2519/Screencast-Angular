import { FirstInterceptorService } from './service/first-interceptor.service';
import { UserService } from './service/user.service';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserCardComponent } from './user/user-card/user-card.component';
import { ItemComponent } from './item/item.component';
import { ColoryDirective } from './item/colory.directive';
import { DelayDirective } from './item/delay.directive';
import { DinamicItemComponent } from './item/dinamic-item/dinamic-item.component';

// import { ReflectiveInjector } from '@angular/core';

// const API_BASE_URL = 'https://jsonplaceholder.typicode.com/';
// чтоб внедрять эту константу как зависимость используют InjectionToken
// сам Token - const API_BASE_URL, имя токена 'API_BASE_URL'
const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserCardComponent,
    ItemComponent,
    ColoryDirective,
    DelayDirective,
    DinamicItemComponent
  ],
  entryComponents: [DinamicItemComponent], // компоненты которые будут добалвены динамически
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
              // Разбор механизма внедрения зависимостей - 1. provider
    // {token, recept} // в recept находится класс (чаще всего)

    // { provide: UserService, useClass: UserService}, // полная запись для UserService
    UserService, // сервисы

    // внедрение зависимости в виде константы
    { provide: API_BASE_URL, useValue: 'https://jsonplaceholder.typicode.com/'}, // полная запись для UserService

    /*
    // внедрение зависимости в виде фабрики
    { provide: UserService, useFactory: function () {
      if (true) {  // useFactory используется, когда используется конструтор и доп логика
        return new UserService(_http); // в таком виде дублируется useClass
      }
    }, deps: ['commonUserServise']}, // для этой функции можно определить зависимости в deps которые будут инджектироваться
    */

    /*
    // в  useExisting указывается provider который был определен до этого
    // { provide: UserService, useExisting: UserService}
    */

    // подключаем провайдер для FirstInterceptorService
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FirstInterceptorService,
      multi: true // флаг, говотр, что значение HTTP_INTERCEPTORS не перезаписывается
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
