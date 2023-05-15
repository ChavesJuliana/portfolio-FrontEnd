import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { faArrowLeft, faArrowRight, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { ExperienciaService } from 'src/app/services/service-experiencia.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-listar-experiencias',
  templateUrl: './listar-experiencias.component.html',
  styleUrls: ['./listar-experiencias.component.css']
})
export class ListarExperienciasComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faTrash = faTrash;
  faEdit = faEdit;

  @Input() experiencia: Experiencia[] = [];
  @Output() seBorro: EventEmitter<any> = new EventEmitter()
  @Output() abrirEditar: EventEmitter<any> = new EventEmitter();
  @Input() rol: String | null = '';


  constructor(
    private readonly experienciaService: ExperienciaService
  ) { }

  ngOnInit(): void {
  }

  abrirModal(titulo: string, id_experiencia: number, descripcion: string, url_foto: string, nombre: string, tipo_trabajo: number, fecha_hasta: Date | null, fecha_desde: Date | null, actualmente: number){
    const myCarouselElement = document.querySelector('#carouselExample');
    const carouselInstance = new bootstrap.Carousel(myCarouselElement!);
    carouselInstance.prev();

    this.abrirEditar.emit( {titulo: titulo, id_experiencia: id_experiencia, descripcion: descripcion, url_foto : url_foto, nombre: nombre, 
      tipo_trabajo : tipo_trabajo, fecha_hasta : fecha_hasta, fecha_desde : fecha_desde, actualmente: actualmente} ); 

  }

  moverCarrouselIzquierda(){
    const myCarouselElement = document.querySelector('#carouselExample');
    const carouselInstance = new bootstrap.Carousel(myCarouselElement!);
    carouselInstance.prev();
  }

  moverCarrouselDerecha(){
    const myCarouselElement = document.querySelector('#carouselExample');
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

        const myCarouselElement = document.querySelector('#carouselExample');
        const carouselInstance = new bootstrap.Carousel(myCarouselElement!);
        carouselInstance.dispose;
        carouselInstance.prev();
       // const activeIndex = carouselInstance.getActiveIndex();

        this.experienciaService.deleteExperiencia(id).subscribe(res => {   
          this.seBorro.emit(id);
          //this.router.navigate(['/']);
        }); 

        Swal.fire({
          title: '¡Listo!',
          text: "Tu lista de experiencias se actualizó.",
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
