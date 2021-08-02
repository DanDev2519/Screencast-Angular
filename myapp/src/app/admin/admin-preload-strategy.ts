import { Observable, of, timer } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { PreloadingStrategy } from '@angular/router';

export class AdminPreloadModules implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // if ( route.data && route.data['notreload'] ) {
    //   return of(null);
    // }
    // return of(null); // если мы не хотим делать предзагрузку
    return load();
    // Observable.of(true).delay(2000).do(() => load());
    // return timer(100000).pipe(() => load());

  }
}
