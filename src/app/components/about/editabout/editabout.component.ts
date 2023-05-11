import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonaService } from 'src/app/services/service-persona.service';
import { Persona } from 'src/app/model/persona';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editabout',
  templateUrl: './editabout.component.html',
  styleUrls: ['./editabout.component.css']
})
export class EditaboutComponent implements OnInit {

  @Input() persona?: Persona;
  @Output() mandarPersona: EventEmitter<any> = new EventEmitter();

  
  aboutForm!: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private readonly personaService: PersonaService,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.aboutForm = this.initForm();
  }
  
 initForm(): FormGroup{
    return this.fb.group({
      nombre: [this.persona?.nombre],
      apellido: [this.persona?.apellido],
      titulo: [this.persona?.titulo],
      descripcion: [this.persona?.descripcion],
      url_foto: ['MiFoto.png']
    })
  } 



  closeModal() {
    this.activeModal.close(this.persona);
  }

  onSubmit(){
    let persona = this.aboutForm.value as Persona;
    this.editarPersona(persona);
    this.closeModal();
  }

  editarPersona(persona: Persona): void {
    this.personaService.updatePersona(persona).subscribe( res => {
      this.persona = persona;
      this.mandarPersona.emit(this.persona);
    })  

  }

  

}
