import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Experiencia } from 'src/app/model/experiencia';
import { ExperienciaService } from 'src/app/services/service-experiencia.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ModalExperienceComponent } from './modal-experience/modal-experience.component';
import { ListarExperienciasComponent } from './listar-experiencias/listar-experiencias.component';




@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  faPlusCircle = faPlusCircle;
  experiencia : Experiencia[] = [];
  @ViewChild('lista') lista!: ListarExperienciasComponent;
  @Input() rol: String | null = '';

  constructor(    
    public modalService: NgbModal,
    private readonly experienciaService: ExperienciaService
    ) { }

  ngOnInit(): void {
    this.experienciaService.getExperiencias().subscribe((experiencia) => 
    ( 
      this.experiencia = experiencia
    ));
  }

  abrirEditar($event: { titulo: string; id_experiencia: number; descripcion: string; url_foto: string; nombre: string; tipo_trabajo: number; fecha_hasta: Date | null; fecha_desde: Date | null; actualmente: number; }){
    this.openModal($event.titulo, $event.id_experiencia, $event.descripcion, $event.url_foto, $event.nombre, $event.tipo_trabajo, $event.fecha_hasta, $event.fecha_desde, $event.actualmente);
  }

  seBorro(id: number){

    let arrayNuevo = this.experiencia.filter(experiencia => experiencia.id_experiencia !== id);
    this.experiencia = [...arrayNuevo];

  }

  openModal(titulo: string, id_experiencia: number, descripcion: string, url_foto: string, nombre: string, tipo_trabajo: number, fecha_hasta: Date | null, fecha_desde: Date | null, actualmente: number) {

    const modalRef = this.modalService.open(ModalExperienceComponent, {"backdrop": 'static', "centered": true, "size": 'lg'});
    modalRef.componentInstance.titulo = titulo; 
    modalRef.componentInstance.id_persona = 1;  
    modalRef.componentInstance.id_experiencia = id_experiencia;  
    modalRef.componentInstance.descripcion = descripcion;  
    modalRef.componentInstance.url_foto = url_foto;  
    modalRef.componentInstance.nombre = nombre;  
    modalRef.componentInstance.tipo_trabajo = tipo_trabajo;  
    modalRef.componentInstance.fecha_hasta = fecha_hasta;  
    modalRef.componentInstance.fecha_desde = fecha_desde;  
    modalRef.componentInstance.actualmente = actualmente;  
    
    modalRef.componentInstance.mandarExperiencia.subscribe((receivedEntry: { experiencia: Experiencia; id_insertada: number;}) => {
      
      if(receivedEntry.experiencia.actualmente == 0){
        receivedEntry.experiencia.actualmente = 0;
      } else {
        receivedEntry.experiencia.actualmente = 1;
      }

      receivedEntry.experiencia.id_experiencia = receivedEntry.id_insertada;


      if( id_experiencia === 0 ){
        this.experiencia.push(receivedEntry.experiencia);
      } else {
        let index = this.experiencia.findIndex((obj => obj.id_experiencia == id_experiencia))
        this.experiencia[index] = receivedEntry.experiencia;
        this.lista.moverCarrouselIzquierda();
      }
  

    })

    modalRef.componentInstance.cerrarExperiencia.subscribe((receivedEntry: number) => {
      if(receivedEntry){
        this.lista.moverCarrouselDerecha();
      }
    })


    modalRef.result.then((result) => {
      console.log("RESULTADO");
    }).catch((error) => {
      console.log("ERROR");
    });
  }

}
