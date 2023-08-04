import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError,BehaviorSubject, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0,email:''});
   url = 'http://localhost/xampp/Api_user.php?empleados';
   url1 = '././assets/data.json';

  constructor(private http:HttpClient) { }

  login(login:LoginRequest): Observable<User>{
    console.log(login);
    return this.http.get<User>(this.url).pipe(
      tap( userData => {
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError));
    
  } 

  private handleError(error: HttpErrorResponse){
    if (error.status==0) {
      console.log('se ha oproducido un error'); 
    }else{
      console.error('Backend retorno el codigo estado',error.status,error.error);
    
    }
    return throwError(()=> new Error('Algo fallo.Prueba nuevamente'));
  }

  get userData():Observable<User>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}
