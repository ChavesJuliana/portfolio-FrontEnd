import { Injectable } from '@angular/core';
import { Credencial, Token } from '../model/credencial';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = environment.urlApi+'/auth';

  constructor(private readonly http: HttpClient) { }

  login(credencial: Credencial): Observable<Token>{
     return this.http.post<Token>(this.url, credencial);
  }
 
  getToken() {
    return localStorage.getItem('token');
  }

}