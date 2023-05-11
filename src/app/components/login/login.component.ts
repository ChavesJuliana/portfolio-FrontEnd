import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { catchError, throwError } from 'rxjs';
import { Credencial } from 'src/app/model/credencial';
import { AuthService } from 'src/app/services/service-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;
  aboutForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.aboutForm = this.initForm();
  }

  initForm(): FormGroup{
    return this.fb.group({
      email: [],
      password: []
    })
  } 

  onSubmit(){
    let credencial = this.aboutForm.value as Credencial;
    this.authService.login(credencial).pipe(
      catchError((error: any) => {
        
        Swal.fire({
          title: 'Error',
          text: "Datos incorrectos",
          icon: 'error',
          confirmButtonColor: '#c13e80',
          confirmButtonText: 'Aceptar',
          iconColor: '#c13e80'
        })

        return throwError(() => ('Inicio de sesión fallida'));
      })
    ).subscribe(response => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']);
    });

  }

}
