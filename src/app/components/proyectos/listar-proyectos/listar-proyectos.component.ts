import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowLeft, faArrowRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import * as bootstrap from 'bootstrap';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/services/service-proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-proyectos',
  templateUrl: './listar-proyectos.component.html',
  styleUrls: ['./listar-proyectos.component.css']
})
export class ListarProyectosComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faTrash = faTrash;
  faEdit = faEdit;

  @Input() proyectos: Proyecto[] = [];
  @Output() seBorro: EventEmitter<any> = new EventEmitter()
  @Output() abrirEditar: EventEmitter<any> = new EventEmitter();
  @Input() rol: String | null = '';

  constructor(
    private readonly proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
  }

  abrirModal(titulo: string, id_proyecto: number, nombre: string, descripcion: string, url_proyecto: string, 
      fecha_hasta: Date | null, fecha_desde: Date | null, actualmente: number, url_foto: string){
    const myCarouselElement = document.querySelector('#carouselProyectos');
    const carouselInstance = new bootstrap.Carousel(myCarouselElement!);
    carouselInstance.prev();

    this.abrirEditar.emit( {titulo: titulo, id_proyecto: id_proyecto, nombre: nombre, descripcion: descripcion, url_proyecto : url_proyecto,  
      fecha_hasta : fecha_hasta, fecha_desde : fecha_desde, actualmente: actualmente, url_foto: url_foto} ); 

  }

  moverCarrouselIzquierda(){
    const myCarouselElement = document.querySelector('#carouselProyectos');
    const carouselInstance = new bootstrap.Carousel(myCarouselElement!);
    carouselInstance.prev();
  }

  moverCarrouselDerecha(){
    const myCarouselElement = document.querySelector('#carouselProyectos');
    const carouselInstance = new bootstrap.Carousel(myCarouselElement!);
    carouselInstance.next();
  }

  deleteAlert(id: number): void {

    Swal.fire({
      title: '¡Atención!',
      text: "¿Estás seguro de borrar esto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c13e80',
      cancelButtonColor: '#e7b1cd',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      iconColor: '#c13e80'
    }).then((result) => {
      if (result.isConfirmed) {

        const myCarouselElement = document.querySelector('#carouselProyectos');
        const carouselInstance = new bootstrap.Carousel(myCarouselElement!);
        carouselInstance.dispose;
        carouselInstance.prev();
         
        this.proyectoService.deleteProyecto(id).subscribe(res => {   
          this.seBorro.emit(id);
        }); 

        Swal.fire({
          title: '¡Listo!',
          text: "Tu lista de proyectos se actualizó.",
          icon: 'success',
          confirmButtonColor: '#c13e80',
          confirmButtonText: 'Aceptar',
          iconColor: '#c13e80'
        }
        )
      }
    })

  }

}
