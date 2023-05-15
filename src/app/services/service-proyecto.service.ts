import { Injectable } from '@angular/core';
import { Proyecto } from '../model/proyecto';
import { Observable } from 'rxjs';
import { Respuesta } from '../model/respuesta';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private readonly url = environment.urlApi+'/proyecto';
  constructor(private readonly http: HttpClient) { }

  getProyectos(): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(this.url+'/getTodos');
  }

  saveProyecto(proyecto: Proyecto): Observable<Respuesta>{
    return this.http.post<Respuesta>(this.url+"/crear", proyecto);
  }

  updateProyecto(proyecto: Proyecto): Observable<Respuesta>{

    let fecha_hasta

    if(proyecto.fecha_hasta == undefined){
      fecha_hasta = '';
    } else {
      fecha_hasta = proyecto.fecha_hasta.toString();
    }

    const params = new HttpParams()
    .set('nombre', proyecto.nombre)
    .set('descripcion', proyecto.descripcion)
    .set('url_proyecto', proyecto.url_proyecto)
    .set('fecha_desde', proyecto.fecha_desde.toString())
    .set('fecha_hasta', fecha_hasta)
    .set('actualmente', proyecto.actualmente)
    .set('url_foto', proyecto.url_foto)

    return this.http.put<Respuesta>(this.url+"/editar/"+proyecto.id_proyecto, params);

  }

  deleteProyecto(id: number): Observable<String>{
    return this.http.delete<String>(this.url+"/delete/"+id);
  }

}