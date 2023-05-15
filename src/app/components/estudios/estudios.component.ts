import { Component, Input, OnInit } from '@angular/core';
import { faGraduationCap, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ModalEstudiosComponent } from './modal-estudios/modal-estudios.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstudioService } from 'src/app/services/service-estudio.service';
import { Educacion } from 'src/app/model/educacion';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {

  faGraduationCap = faGraduationCap;
  faPlusCircle = faPlusCircle;
  @Input() rol: String | null = '';
  educacion : Educacion[] = [];

  constructor(
    public modalService: NgbModal,
    private readonly estudioService: EstudioService
  ) {}

  ngOnInit(): void {
    this.estudioService.getEducacion().subscribe((educacion) => 
    ( 
      this.educacion = educacion
    ));
    
  }

  abrirEditar($event: { titulo: string; id: number; nombre: string; institucion: string; fecha_desde: Date; fecha_hasta: Date; actualmente: number; }){
    this.openModal($event.titulo, $event.id, $event.nombre, $event.institucion, $event.fecha_desde, $event.fecha_hasta, $event.actualmente);
  }

  seBorro(id: number){
    let arrayNuevo = this.educacion.filter(educacion => educacion.id_educacion !== id);
    this.educacion = [...arrayNuevo];
  }

  openModal(titulo: string, id: number, nombre: string, institucion: string, fecha_desde: Date | null, fecha_hasta: Date | null, actualmente: number) {

    const modalRef = this.modalService.open(ModalEstudiosComponent, {"backdrop": 'static', "centered": true, "size": 'lg'});
    modalRef.componentInstance.titulo = titulo; 
    modalRef.componentInstance.id_persona = 1;  
    modalRef.componentInstance.id_educacion = id;    
    modalRef.componentInstance.nombre = nombre;   
    modalRef.componentInstance.institucion = institucion;
    modalRef.componentInstance.fecha_desde = fecha_desde;   
    modalRef.componentInstance.fecha_hasta = fecha_hasta;   
    modalRef.componentInstance.actualmente = actualmente;   
    
    modalRef.componentInstance.mandarEstudio.subscribe((receivedEntry: { educacion: Educacion; id_insertada: number;}) => {
      
      if(receivedEntry.educacion.actualmente == 0){
        receivedEntry.educacion.actualmente = 0;
      } else {
        receivedEntry.educacion.actualmente = 1;
      }

      receivedEntry.educacion.id_educacion = receivedEntry.id_insertada;

      if( id === 0 ){
        this.educacion.push(receivedEntry.educacion);
      } else {
        let index = this.educacion.findIndex((obj => obj.id_educacion == id))
        this.educacion[index] = receivedEntry.educacion;
      }
  

    })

    modalRef.result.then((result) => {
      console.log("RESULTADO");
    }).catch((error) => {
      console.log("ERROR");
    });
  }

}
