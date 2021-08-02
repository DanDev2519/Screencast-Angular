import { AdminPreloadModules } from './admin/admin-preload-strategy';
import { LoginComponent } from './user/login/login.component';
import { UserResolveService } from './service/user-resolve.service';
import { AuthGuard } from './service/auth.guard';
import { RouterModule, CanActivate, PreloadAllModules } from '@angular/router';
import { FirstInterceptorService } from './service/first-interceptor.service';
import { UserService } from './service/user.service';
import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserCardComponent } from './user/user-card/user-card.component';
import { ItemComponent } from './item/item.component';
import { ColoryDirective } from './item/colory.directive';
import { DelayDirective } from './item/delay.directive';
import { DinamicItemComponent } from './item/dinamic-item/dinamic-item.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SettingsComponent } from './user/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { ReflectiveInjector } from '@angular/core';

// const API_BASE_URL = 'https://jsonplaceholder.typicode.com/';
// чтоб внедрять эту константу как зависимость используют InjectionToken
// сам Token - const API_BASE_URL, имя токена 'API_BASE_URL'
const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

/*
  * Guards
  * CanActivate - разрешает активировать стейты (роуты)
  * CanActivateChild - разрешает активировать вложенные стейты (роуты)
  * CanDeactivate - можно ли уйти с роута (можно уведомить пользователя, что нужно сохраниться перед уходом)
  * CanLoad - как CanActivate только для ленивой загрузки

  * Resilve - отвечает за подгрузку данных (до активации стейта он асинхронно подгружает данные)
*/

const route = [
  { path: '', component: ItemComponent},
  { path: 'admin',
    data: {
      notreload: true
    },
    loadChildren: () => import('./admin/admin.module')
      .then(module => module.AdminModule)}, // для ленивой загрузки
  { path: 'login', component: LoginComponent, outlet: 'popup'}, // для именнованного outlet
  { path: 'users',
    component: UserComponent,
    canActivate: [ AuthGuard ],
    resolve: {
      //какие данные хотим подрузить: серсив resolver
      user: UserResolveService // компонента загрузится, когда выполниться UserResolveService и в user будут данные
    },
    children: [
      { path: 'profile', component: ProfileComponent},
      { path: 'settings', component: SettingsComponent},
    ]
  },
  // data - статические данные
  { path: 'users/:userID', component: UserCardComponent, data: { title: 'users' }},
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserCardComponent,
    ItemComponent,
    ColoryDirective,
    DelayDirective,
    DinamicItemComponent,
    ProfileComponent,
    SettingsComponent,
    LoginComponent
  ],
  entryComponents: [DinamicItemComponent], // компоненты которые будут добалвены динамически
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // RouterModule.forRoot(route),
    // RouterModule.forRoot(route, {useHash: true}), //для использования диеза в сслках
    // RouterModule.forRoot(route, {preloadingStrategy: PreloadAllModules}), // для предзагрузки всех модулей ленивой звгрузки
    RouterModule.forRoot(route, {preloadingStrategy: AdminPreloadModules}), // для предзагрузки модулей ленивой звгрузки по собственному усмотрению
    FormsModule, // для форм
    ReactiveFormsModule, // для реактивныйх форм
  ],
  providers: [
              // Разбор механизма внедрения зависимостей - 1. provider
    // {token, recept} // в recept находится класс (чаще всего)

    // { provide: UserService, useClass: UserService}, // полная запись для UserService
    UserService, // сервисы
    // Статический инжектор с указанием типа внедряемой зависимости
    // { provide: UserService, useClass: UserService, deps: [HttpClient]},

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
    },
    AuthGuard,
    UserResolveService,
    AdminPreloadModules
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
