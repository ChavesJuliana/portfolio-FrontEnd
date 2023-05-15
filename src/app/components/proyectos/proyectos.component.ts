import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { faPlusCircle, faArrowRight,  faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/services/service-proyecto.service';
import { ListarProyectosComponent } from './listar-proyectos/listar-proyectos.component';
import { ModalProyectosComponent } from './modal-proyectos/modal-proyectos.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faPlusCircle = faPlusCircle;

  proyectos : Proyecto[] = [];
  @ViewChild('lista') lista!: ListarProyectosComponent;
  @Input() rol: String | null = '';

  constructor(
    public modalService: NgbModal,
    private readonly proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
    this.proyectoService.getProyectos().subscribe((proyectos) => 
    ( 
      this.proyectos = proyectos
    ));
  }

  
  abrirEditar($event: { titulo: string; id_proyecto: number; nombre: string; descripcion: string; url_proyecto: string;
    fecha_hasta: Date | null; fecha_desde: Date | null; actualmente: number; url_foto: string;}){
    this.openModal($event.titulo, $event.id_proyecto, $event.nombre, $event.descripcion, $event.url_proyecto,  
      $event.fecha_hasta, $event.fecha_desde, $event.actualmente, $event.url_foto);
  }

  seBorro(id: number){
    let arrayNuevo = this.proyectos.filter(proyecto => proyecto.id_proyecto !== id);
    this.proyectos = [...arrayNuevo];
  }

  openModal(titulo: string, id_proyecto: number, nombre: string, descripcion: string, url_proyecto : string,  
    fecha_hasta : Date | null, fecha_desde : Date | null, actualmente: number, url_foto: string) {

    const modalRef = this.modalService.open(ModalProyectosComponent, {"backdrop": 'static', "centered": true, "size": 'lg'});
    modalRef.componentInstance.titulo = titulo; 
    modalRef.componentInstance.id_persona = 1;  
    modalRef.componentInstance.id_proyecto = id_proyecto;  
    modalRef.componentInstance.descripcion = descripcion;  
    modalRef.componentInstance.url_proyecto = url_proyecto;  
    modalRef.componentInstance.url_foto = url_foto;  
    modalRef.componentInstance.nombre = nombre;  
    modalRef.componentInstance.fecha_hasta = fecha_hasta;  
    modalRef.componentInstance.fecha_desde = fecha_desde;  
    modalRef.componentInstance.actualmente = actualmente;  

    modalRef.componentInstance.mandarProyecto.subscribe((receivedEntry: { proyecto: Proyecto; id_insertada: number;}) => {
      
      if(receivedEntry.proyecto.actualmente == 0){
        receivedEntry.proyecto.actualmente = 0;
      } else {
        receivedEntry.proyecto.actualmente = 1;
      }

      receivedEntry.proyecto.id_proyecto = receivedEntry.id_insertada;


      if( id_proyecto === 0 ){
        this.proyectos.push(receivedEntry.proyecto);
      } else {
        let index = this.proyectos.findIndex((obj => obj.id_proyecto == id_proyecto))
        this.proyectos[index] = receivedEntry.proyecto;
        this.lista.moverCarrouselIzquierda();
      }
  

    })

    modalRef.componentInstance.cerrarProyecto.subscribe((receivedEntry: number) => {
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
