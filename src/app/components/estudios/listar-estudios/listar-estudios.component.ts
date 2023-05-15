import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Educacion } from 'src/app/model/educacion';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { EstudioService } from 'src/app/services/service-estudio.service';


@Component({
  selector: 'app-listar-estudios',
  templateUrl: './listar-estudios.component.html',
  styleUrls: ['./listar-estudios.component.css']
})
export class ListarEstudiosComponent implements OnInit {
  faTrash = faTrash;
  faEdit = faEdit;

  @Input() educacion: Educacion[] = [];
  @Output() seBorro: EventEmitter<any> = new EventEmitter()
  @Output() abrirEditar: EventEmitter<any> = new EventEmitter();
  @Input() rol: String | null = '';

  constructor(
    private readonly estudioService: EstudioService
  ) { }

  ngOnInit(): void {
  }

  abrirModal(titulo: string, id: number, nombre: string, institucion: string, fecha_desde: Date, fecha_hasta: Date, actualmente: number){
    this.abrirEditar.emit( {titulo: titulo, id: id, nombre: nombre, institucion : institucion, fecha_desde: fecha_desde, fecha_hasta : fecha_hasta, actualmente : actualmente} );
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

        this.estudioService.deleteEstudio(id).subscribe(res => {            
          this.seBorro.emit(id);
        });

        Swal.fire({
          title: '¡Listo!',
          text: "Tu lista de estudios se actualizó.",
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
