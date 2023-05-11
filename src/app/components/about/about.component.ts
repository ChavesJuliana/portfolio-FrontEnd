import { Component, OnInit } from '@angular/core';
import { faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Persona } from 'src/app/model/persona';
import { PersonaService } from 'src/app/services/service-persona.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditaboutComponent } from './editabout/editabout.component';




@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  faUser = faUser;
  faEdit = faEdit;
  persona?: Persona;
  aboutForm!: FormGroup;

  constructor(
    public modalService: NgbModal,
    private readonly personaService: PersonaService,
    private readonly fb: FormBuilder
  ) { 
  }

  ngOnInit(): void {
    this.personaService.getPersona().subscribe( res => {
      this.persona = res;
    })   
  }

  initForm(): FormGroup{
    return this.fb.group({
      nombre: [''],
      apellido: [''],
      titulo: [''],
      descripcion: [''],
      url_foto: ['MiFoto.png']
    })
  }

  openModal() {

    const modalRef = this.modalService.open(EditaboutComponent, {"backdrop": 'static', "centered": true, "size": 'lg'});
    modalRef.componentInstance.persona = this.persona;
    modalRef.componentInstance.mandarPersona.subscribe((receivedEntry: Persona) => {
      this.persona = receivedEntry;
    })

    modalRef.result.then((result) => {
      console.log(result);
      this.persona = result;
    }).catch((error) => {
      console.log(error);
    });
  }



}
