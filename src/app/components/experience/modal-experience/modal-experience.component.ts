import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Experiencia } from 'src/app/model/experiencia';
import { Tipo_trabajo } from 'src/app/model/tipo_trabajo';
import { ExperienciaService } from 'src/app/services/service-experiencia.service';
import { TipoTrabajoService } from 'src/app/services/service-tipo-trabajo.service';

@Component({
  selector: 'app-modal-experience',
  templateUrl: './modal-experience.component.html',
  styleUrls: ['./modal-experience.component.css']
})
export class ModalExperienceComponent implements OnInit {
  aboutForm!: FormGroup;

  @Input() titulo: String = "";
  @Input() id_experiencia: number = 0;
  @Input() id_persona: number = 0;
  @Input() actualmente: number = 0;
  @Input() tipo_trabajo: number = 1;
  @Input() nombre: String = "";
  @Input() url_foto: String = "";
  @Input() descripcion: String = "";
  @Input() fecha_desde: Date = new Date();
  @Input() fecha_hasta: Date = new Date();
  @Output() mandarExperiencia: EventEmitter<any> = new EventEmitter();
  @Output() cerrarExperiencia: EventEmitter<any> = new EventEmitter();


  tipotrabajo: Tipo_trabajo[] = [];
  
  constructor(   
    private readonly fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private readonly tipoTrabajoService: TipoTrabajoService,
    private readonly experienciaService: ExperienciaService
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


    this.tipoTrabajoService.getTipoTrabajos().subscribe((tipotrabajo) => 
    ( 
      this.tipotrabajo = tipotrabajo
    ));
  
}

  initForm(): FormGroup{
    return this.fb.group({
      descripcion: [this.descripcion, [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      url_foto: [this.url_foto, [Validators.required]],
      nombre: [this.nombre,  [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      tipo_trabajo: [this.tipo_trabajo],
      fecha_desde: [this.fecha_desde],
      fecha_hasta: [this.fecha_hasta],
      actualmente: [''+this.actualmente],
      id_experiencia: [this.id_experiencia],
      id_persona: [this.id_persona]
    })
  } 

  closeModal() {
    this.activeModal.close();
    if(this.id_experiencia != 0){
      this.cerrarExperiencia.emit(1);
    }
  }

  onSubmit(){
    let experiencia = this.aboutForm.value as Experiencia;
    let tipoValor = this.aboutForm.get('tipo_trabajo')?.value;

    let tipoTrabajo: Tipo_trabajo = {
      id_tipo_trabajo: tipoValor,
      nombre_trabajo: this.tipotrabajo[tipoValor-1].nombre_trabajo
    }
    
    experiencia.tipoTrabajo = tipoTrabajo;

    if(this.id_experiencia === 0){ 
      this.nuevaExperiencia(experiencia);
    } else {
      this.editarExperiencia(experiencia);
    }  

    this.closeModal();
  }
  
  editarExperiencia(experiencia: Experiencia): void {
    this.experienciaService.updateExperiencia(experiencia).subscribe( res => {
      this.mandarExperiencia.emit( {experiencia: experiencia, id_insertada: res.id} );
    })  

  }

  nuevaExperiencia(experiencia: Experiencia): void {
    this.experienciaService.saveExperiencia(experiencia).subscribe( res => {
      this.mandarExperiencia.emit( {experiencia: experiencia, id_insertada: res.id} );
    })  

  }


}
