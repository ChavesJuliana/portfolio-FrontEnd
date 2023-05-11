import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Educacion } from 'src/app/model/educacion';
import { EstudioService } from 'src/app/services/service-estudio.service';

@Component({
  selector: 'app-modal-estudios',
  templateUrl: './modal-estudios.component.html',
  styleUrls: ['./modal-estudios.component.css']
})
export class ModalEstudiosComponent implements OnInit {
  
  aboutForm!: FormGroup;
  @Input() titulo: String = "";
  @Input() nombre: String = "";
  @Input() institucion: String = "";
  @Input() fecha_desde: Date = new Date();
  @Input() fecha_hasta: Date = new Date();
  @Input() actualmente: number = 0;
  @Input() id_educacion: number = 0;
  @Input() id_persona: number = 0;
  @Output() mandarEstudio: EventEmitter<any> = new EventEmitter();

  constructor(
    private activeModal: NgbActiveModal,
    private readonly fb: FormBuilder,
    private readonly estudioService: EstudioService
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
    });

  }

  initForm(): FormGroup{
    return this.fb.group({
      id_educacion: [this.id_educacion],
      nombre: [this.nombre],
      institucion: [this.institucion],
      fecha_desde: [this.fecha_desde],
      fecha_hasta: [this.fecha_hasta],
      actualmente: [''+this.actualmente],
      id_persona: [this.id_persona]
    })
  } 

  closeModal() {
    this.activeModal.close();
  }

  onSubmit(){
    let educacion = this.aboutForm.value as Educacion;

    if(this.id_educacion === 0){ 
      this.nuevaEducacion(educacion);
    } else {
      this.editarEducacion(educacion);
    } 

    this.closeModal();
  }


  
  editarEducacion(educacion: Educacion): void {
    this.estudioService.updateEducacion(educacion).subscribe( res => {
      this.mandarEstudio.emit( {educacion: educacion, id_insertada: res.id} );
    })  

  }

  nuevaEducacion(educacion: Educacion): void {
    this.estudioService.saveEducacion(educacion).subscribe( res => {
      this.mandarEstudio.emit( {educacion: educacion, id_insertada: res.id} );
    })  

  }
  

 
  

}
