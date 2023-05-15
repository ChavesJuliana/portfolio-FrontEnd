import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/services/service-persona.service';
import { Persona } from 'src/app/model/persona';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editabout',
  templateUrl: './editabout.component.html',
  styleUrls: ['./editabout.component.css']
})
export class EditaboutComponent implements OnInit {

  @Input() persona?: Persona;
  @Output() mandarPersona: EventEmitter<any> = new EventEmitter();

  private readonly url = environment.urlApi+'/persona/media/';

  archivo!: File;
  
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
      nombre: [this.persona?.nombre, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      apellido: [this.persona?.apellido, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      titulo: [this.persona?.titulo, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]],
      descripcion: [this.persona?.descripcion, [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      url_foto: [this.persona?.url_foto]
    })
  } 



  closeModal() {
    this.activeModal.close(this.persona);
  }

  onSubmit(){

    let persona = this.aboutForm.value as Persona;
    const formData = new FormData()

    if(this.archivo){  
      formData.append('file', this.archivo);
      persona.url_foto = this.url+this.archivo.name;
    } else {
      formData.append('file', '');
      persona.url_foto = this.persona!.url_foto;
    }

    this.personaService.updatePersona(formData, persona).subscribe( res => {
      this.persona = persona;
      this.mandarPersona.emit(this.persona);
    });

    this.closeModal();
  }

  onFileSelected(event : any) {
    this.archivo = event.target.files[0];
  }




}
