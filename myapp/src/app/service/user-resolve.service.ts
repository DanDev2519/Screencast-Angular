import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

interface IUser {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class UserResolveService implements Resolve<IUser> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {
    return of({name: 'Kate'})
  }

}
