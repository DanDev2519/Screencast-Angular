import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import 'rxjs/add/observable/throw';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirstInterceptorService implements HttpInterceptor {

  /*
  HttpClient => Interceptor => API
  HttpClient <= Interceptor <= API
  */

  // Интерсептор пустышка, которая прокидывает запрос дальше
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const request = req.clone();
  //   return next.handle(request); // передача дальше данных на обработку
  // }

  // Интерсептор для проверки на ошибки ответа с сервера
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({ params: req.params.set('x', '5') }); // добавляем параметр
    return next.handle(request).pipe(catchError((error: any) => {
      if (error.status === 401) {
        console.log('REDIRECT TO LOADING!!!');
      }
      return throwError(error); // передать ошибку дальше
    }));
  }
}
