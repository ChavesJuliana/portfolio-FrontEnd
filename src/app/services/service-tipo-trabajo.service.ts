import { Injectable } from '@angular/core';
import { Tipo_trabajo } from '../model/tipo_trabajo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoTrabajoService {

  private readonly url = environment.urlApi+'/tipotrabajo';
  constructor(private readonly http: HttpClient) { }

  getTipoTrabajos(): Observable<Tipo_trabajo[]>{
    return this.http.get<Tipo_trabajo[]>(this.url+'/getTodos');
  }

}
