import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConocimientoService } from 'src/app/services/service-conocimiento.service';
import { Conocimiento } from 'src/app/model/conocimiento';


@Component({
  selector: 'app-modal-conocimientos',
  templateUrl: './modal-conocimientos.component.html',
  styleUrls: ['./modal-conocimientos.component.css']
})
export class ModalConocimientosComponent implements OnInit {

  aboutForm!: FormGroup;
  @Input() nombre: String = "";
  @Input() porcentaje: number = 0;
  @Input() titulo: String = "";
  @Input() tipo_conocimiento: number = 0;
  @Input() id_persona: number = 0;
  @Input() id: number = 0;
  @Output() mandarConocimiento: EventEmitter<any> = new EventEmitter();


  constructor(
    private activeModal: NgbActiveModal,
    private readonly conocimientoService: ConocimientoService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.aboutForm = this.initForm();
  }

  initForm(): FormGroup{
    return this.fb.group({
      id_conocimiento: [this.id],
      nombre: [this.nombre],
      porcentaje: [this.porcentaje],
      id_persona: [this.id_persona],
      tipo_conocimiento: [this.tipo_conocimiento]
    })
  } 

  closeModal() {
    this.activeModal.close();
  }

  onSubmit(){
    let conocimiento = this.aboutForm.value as Conocimiento;

    if(this.id === 0){
      this.nuevoConocimiento(conocimiento);
    } else {
      this.editarConocimiento(conocimiento);
    }
    this.closeModal();
  }

  editarConocimiento(conocimiento: Conocimiento): void {
    this.conocimientoService.updateConocimiento(conocimiento).subscribe( res => {
      this.mandarConocimiento.emit( {conocimiento: conocimiento, id_insertada: res.id} );
    })  

  }


  nuevoConocimiento(conocimiento: Conocimiento): void {
    this.conocimientoService.saveConocimiento(conocimiento).subscribe( res => {
      this.mandarConocimiento.emit( {conocimiento: conocimiento, id_insertada: res.id} );
    })  

  }
  

}
