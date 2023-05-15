import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Respuesta } from '../model/respuesta';
import { Experiencia } from '../model/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private readonly url = environment.urlApi+'/experiencia';
  constructor(private readonly http: HttpClient) { }

  getExperiencias(): Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(this.url+'/getTodos');
  }

  saveExperiencia(experiencia: Experiencia): Observable<Respuesta>{
    return this.http.post<Respuesta>(this.url+"/crear", experiencia);
  }

  updateExperiencia(experiencia: Experiencia): Observable<Respuesta>{

    let fecha_hasta

    if(experiencia.fecha_hasta == undefined){
      fecha_hasta = '';
    } else {
      fecha_hasta = experiencia.fecha_hasta.toString();
    }

    const params = new HttpParams()
    .set('url_foto', experiencia.url_foto)
    .set('descripcion', experiencia.descripcion)
    .set('fecha_desde', experiencia.fecha_desde.toString())
    .set('fecha_hasta', fecha_hasta)
    .set('actualmente', experiencia.actualmente)
    .set('tipo_trabajo', experiencia.tipoTrabajo.id_tipo_trabajo)
    .set('nombre', experiencia.nombre)
  
    return this.http.put<Respuesta>(this.url+"/editar/"+experiencia.id_experiencia, params);

  }

  deleteExperiencia(id: number): Observable<String>{
    return this.http.delete<String>(this.url+"/delete/"+id);
  }

}
