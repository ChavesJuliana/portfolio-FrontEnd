import { Injectable } from '@angular/core';
import { Persona } from '../model/persona';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private readonly url = environment.urlApi+'/persona';
  constructor(private readonly http: HttpClient) { }

  getPersona(): Observable<Persona>{
    return this.http.get<Persona>(this.url+'/get/2');
  }

  updatePersona(formData: FormData, persona: Persona): Observable<string>{

    formData.append('nombre', persona.nombre);
    formData.append('apellido', persona.apellido);
    formData.append('descripcion', persona.descripcion);
    formData.append('titulo', persona.titulo);
  
    return this.http.put<string>(this.url+"/editar/2", formData);
  } 


}
