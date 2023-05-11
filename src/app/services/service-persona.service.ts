import { Injectable } from '@angular/core';
import { Persona } from '../model/persona';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {HttpParams} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private readonly url = environment.urlApi+'/persona';
  constructor(private readonly http: HttpClient) { }

  getPersona(): Observable<Persona>{
    return this.http.get<Persona>(this.url+'/get/1');
  }

  updatePersona(persona: Persona): Observable<string>{

    const params = new HttpParams()
    .set('nombre', persona.nombre)
    .set('apellido', persona.apellido)
    .set('descripcion', persona.descripcion)
    .set('url_foto', persona.url_foto)
    .set('titulo', persona.titulo);
  
    return this.http.put<string>(this.url+"/editar/1", params);
  }

}
