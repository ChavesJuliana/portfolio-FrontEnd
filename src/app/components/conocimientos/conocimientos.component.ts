import { Component, OnInit } from '@angular/core';
import { faDatabase, faCode, faLaptopCode, faCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Conocimiento } from 'src/app/model/conocimiento';
import { ConocimientoService } from 'src/app/services/service-conocimiento.service';
import { ModalConocimientosComponent } from './modal-conocimientos/modal-conocimientos.component';

@Component({
  selector: 'app-conocimientos',
  templateUrl: './conocimientos.component.html',
  styleUrls: ['./conocimientos.component.css']
})
export class ConocimientosComponent implements OnInit {

  faDatabase = faDatabase;
  faCode = faCode;
  faLaptopCode = faLaptopCode;
  faCircle = faCircle;
  faPlusCircle = faPlusCircle;

  conocimientos: Conocimiento[] = [];
  programacion: Conocimiento[] = [];
  base_datos: Conocimiento[] = [];
  otros: Conocimiento[] = [];
  soft_skills: Conocimiento[] = [];


  constructor(
    public modalService: NgbModal,
    private readonly conocimientoService: ConocimientoService
  ) { }

  ngOnInit(): void {
    this.conocimientoService.getConocimientos().subscribe((conocimientos) => 
    ( this.conocimientos = conocimientos,
      this.programacion = conocimientos.filter(conocimiento => conocimiento.tipo_conocimiento == 1),
      this.base_datos = conocimientos.filter(conocimiento => conocimiento.tipo_conocimiento == 2),
      this.otros = conocimientos.filter(conocimiento => conocimiento.tipo_conocimiento == 3),
      this.soft_skills = conocimientos.filter(conocimiento => conocimiento.tipo_conocimiento == 4)
    ));
  }

  abrirEditar($event: { titulo: string; id: number; tipo_conocimiento: number; nombre: string; porcentaje: number;}){
    this.openModal($event.titulo, $event.tipo_conocimiento, $event.id, $event.nombre, $event.porcentaje);
  }

  seBorro($event: { tipo_conocimiento: number; id: number}){

    let arrayNuevo;
    switch($event.tipo_conocimiento){
      case 1:    
              arrayNuevo = this.programacion.filter(conocimiento => conocimiento.id_conocimiento !== $event.id)
              this.programacion = [...arrayNuevo];
              break;
      case 2: 
              arrayNuevo = this.base_datos.filter(conocimiento => conocimiento.id_conocimiento !== $event.id)
              this.base_datos = [...arrayNuevo];
              break;
      case 3: 
              arrayNuevo = this.otros.filter(conocimiento => conocimiento.id_conocimiento !== $event.id)
              this.otros = [...arrayNuevo];
              break;
      case 4: 
              arrayNuevo = this.soft_skills.filter(conocimiento => conocimiento.id_conocimiento !== $event.id)
              this.soft_skills = [...arrayNuevo];
              break;
    }
  }


  openModal(titulo: string, tipo_conocimiento: number, id: number, nombre: string, porcentaje: number) {

    const modalRef = this.modalService.open(ModalConocimientosComponent, {"backdrop": 'static', "centered": true, "size": 'lg'});
    modalRef.componentInstance.titulo = titulo;
    modalRef.componentInstance.id_persona = 1;
    modalRef.componentInstance.tipo_conocimiento = tipo_conocimiento;
    modalRef.componentInstance.nombre = nombre;
    modalRef.componentInstance.porcentaje = porcentaje;
    modalRef.componentInstance.id = id;
    
    modalRef.componentInstance.mandarConocimiento.subscribe((receivedEntry: { conocimiento: Conocimiento; id_insertada: number;}) => {
      
      receivedEntry.conocimiento.id_conocimiento = receivedEntry.id_insertada;        

      switch(tipo_conocimiento){
        case 1: 
                if(id === 0){
                  this.programacion.push(receivedEntry.conocimiento);
                } else {               
                  let index = this.programacion.findIndex((obj => obj.id_conocimiento == id))
                  this.programacion[index] = receivedEntry.conocimiento;
                }         
                break;
        case 2: 
                if(id === 0){
                  this.base_datos.push(receivedEntry.conocimiento);
                } else {               
                  let index = this.base_datos.findIndex((obj => obj.id_conocimiento == id))
                  this.base_datos[index] = receivedEntry.conocimiento;
                }    
                break;
        case 3: 
                if(id === 0){
                this.otros.push(receivedEntry.conocimiento);
                } else {               
                  let index = this.otros.findIndex((obj => obj.id_conocimiento == id))
                  this.otros[index] = receivedEntry.conocimiento;
                }    
                break;
        case 4: 
                if(id === 0){
                this.soft_skills.push(receivedEntry.conocimiento);
                } else {               
                  let index = this.soft_skills.findIndex((obj => obj.id_conocimiento == id))
                  this.soft_skills[index] = receivedEntry.conocimiento;
                }    
                break;
      }
    })

    modalRef.result.then((result) => {
      console.log("RESULTADO");
    }).catch((error) => {
      console.log("ERROR");
    });
  }

}
