import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Educacion } from '../model/educacion';
import { Observable } from 'rxjs';
import { Respuesta } from '../model/respuesta';

@Injectable({
  providedIn: 'root'
})
export class EstudioService {

  private readonly url = environment.urlApi+'/educacion';
  constructor(private readonly http: HttpClient) { }

  getEducacion(): Observable<Educacion[]>{
    return this.http.get<Educacion[]>(this.url+'/getTodos');
  }

  saveEducacion(educacion: Educacion): Observable<Respuesta>{
    return this.http.post<Respuesta>(this.url+"/crear", educacion);
  }

  updateEducacion(educacion: Educacion): Observable<Respuesta>{

    let fecha_hasta

    if(educacion.fecha_hasta == undefined){
      fecha_hasta = '';
    } else {
      fecha_hasta = educacion.fecha_hasta.toString();
    }

    const params = new HttpParams()
    .set('nombre', educacion.nombre)
    .set('institucion', educacion.institucion)
    .set('fecha_desde', educacion.fecha_desde.toString())
    .set('fecha_hasta', fecha_hasta)
    .set('actualmente', educacion.actualmente)

    return this.http.put<Respuesta>(this.url+"/editar/"+educacion.id_educacion, params);

  } 

  deleteEstudio(id: number): Observable<String>{
    return this.http.delete<String>(this.url+"/delete/"+id);
  }  
  
}
