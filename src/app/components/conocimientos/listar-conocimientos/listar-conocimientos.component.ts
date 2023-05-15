import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Conocimiento } from 'src/app/model/conocimiento';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { ConocimientoService } from 'src/app/services/service-conocimiento.service';

@Component({
  selector: 'app-listar-conocimientos',
  templateUrl: './listar-conocimientos.component.html',
  styleUrls: ['./listar-conocimientos.component.css']
})
export class ListarConocimientosComponent implements OnInit {
  faTrash = faTrash;
  faEdit = faEdit;
  @Input() conocimientos: Conocimiento[] = [];
  @Input() rol: String | null = '';
  @Output() abrirEditar: EventEmitter<any> = new EventEmitter();
  @Output() seBorro: EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly conocimientoService: ConocimientoService
  ) { }

  ngOnInit(): void {
  }

  abrirModal(id: number, titulo: string, tipo_conocimiento: number, nombre: string, porcentaje: number){
    this.abrirEditar.emit( {id:id, titulo: titulo, tipo_conocimiento: tipo_conocimiento, nombre : nombre, porcentaje: porcentaje} );
  }

  deleteAlert(id: number, tipo_conocimiento: number): void {

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

        this.conocimientoService.deleteConocimiento(id).subscribe(res => {            
         
          console.log("holiwis");
          this.seBorro.emit( {tipo_conocimiento: tipo_conocimiento, id:id } );
        });

        Swal.fire({
          title: '¡Listo!',
          text: "Tu lista de conocimientos se actualizó.",
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
