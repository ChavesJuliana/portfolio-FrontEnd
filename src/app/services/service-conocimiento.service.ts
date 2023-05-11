import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Conocimiento } from '../model/conocimiento';
import { Respuesta } from '../model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class ConocimientoService {

  private readonly url = environment.urlApi+'/conocimiento';
  constructor(private readonly http: HttpClient) { }

  getConocimientos(): Observable<Conocimiento[]>{
    return this.http.get<Conocimiento[]>(this.url+'/getTodos');
  }

  saveConocimiento(conocimiento: Conocimiento): Observable<Respuesta>{
    return this.http.post<Respuesta>(this.url+"/crear", conocimiento);
  }

  updateConocimiento(conocimiento: Conocimiento): Observable<Respuesta>{

    const params = new HttpParams()
    .set('nombre', conocimiento.nombre)
    .set('porcentaje', conocimiento.porcentaje)
  
    return this.http.put<Respuesta>(this.url+"/editar/"+conocimiento.id_conocimiento, params);

  }

  deleteConocimiento(id: number): Observable<String>{
    return this.http.delete<String>(this.url+"/delete/"+id);
  }

}
