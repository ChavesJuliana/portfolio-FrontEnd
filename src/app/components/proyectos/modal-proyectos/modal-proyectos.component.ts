import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/services/service-proyecto.service';

@Component({
  selector: 'app-modal-proyectos',
  templateUrl: './modal-proyectos.component.html',
  styleUrls: ['./modal-proyectos.component.css']
})
export class ModalProyectosComponent implements OnInit {
  aboutForm!: FormGroup;

  @Input() titulo: String = "";
  @Input() id_proyecto: number = 0;
  @Input() url_proyecto: String = "";
  @Input() url_foto: String = "";
  @Input() id_persona: number = 0;
  @Input() actualmente: number = 0;
  @Input() nombre: String = "";
  @Input() descripcion: String = "";
  @Input() fecha_desde: Date = new Date();
  @Input() fecha_hasta: Date = new Date();
  @Output() mandarProyecto: EventEmitter<any> = new EventEmitter();
  @Output() cerrarProyecto: EventEmitter<any> = new EventEmitter();

  
  constructor(   
    private readonly fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private readonly proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
    this.aboutForm = this.initForm();

    const fechaHastaControl = this.aboutForm.get('fecha_hasta');
    
    if ( this.actualmente === 0 ) {
      fechaHastaControl?.disable();
    } 
    
    this.aboutForm.get('actualmente')?.valueChanges.subscribe(actualmenteValue => {
      if (actualmenteValue === '0') {
        fechaHastaControl?.disable();
        this.aboutForm.get('fecha_hasta')?.setValue(null);
      } else {
        fechaHastaControl?.enable();
      }
    })

 
}

  initForm(): FormGroup{
    return this.fb.group({
      descripcion: [this.descripcion, [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      url_proyecto: [this.url_proyecto, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      url_foto: [this.url_foto, [Validators.required]],
      nombre: [this.nombre, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      fecha_desde: [this.fecha_desde],
      fecha_hasta: [this.fecha_hasta],
      actualmente: [''+this.actualmente],
      id_proyecto: [this.id_proyecto],
      id_persona: [this.id_persona]
    })
  } 

  closeModal() {
    this.activeModal.close();
    if(this.id_proyecto != 0){
      this.cerrarProyecto.emit(1);
    }
  }

  onSubmit(){
    let proyecto = this.aboutForm.value as Proyecto;

    if(this.id_proyecto === 0){ 
      this.nuevoProyecto(proyecto);
    } else {
      this.editarProyecto(proyecto);
    }  

    this.closeModal();
  }
  
  editarProyecto(proyecto: Proyecto): void {
    this.proyectoService.updateProyecto(proyecto).subscribe( res => {
      this.mandarProyecto.emit( {proyecto: proyecto, id_insertada: res.id} );
    })  

  }

  nuevoProyecto(proyecto: Proyecto): void {
    this.proyectoService.saveProyecto(proyecto).subscribe( res => {
      this.mandarProyecto.emit( {proyecto: proyecto, id_insertada: res.id} );
    })  

  }


}
