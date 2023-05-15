import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConocimientosComponent } from './components/conocimientos/conocimientos.component';
import { EstudiosComponent } from './components/estudios/estudios.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EditaboutComponent } from './components/about/editabout/editabout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListarConocimientosComponent } from './components/conocimientos/listar-conocimientos/listar-conocimientos.component';
import { ModalConocimientosComponent } from './components/conocimientos/modal-conocimientos/modal-conocimientos.component';
import { ModalEstudiosComponent } from './components/estudios/modal-estudios/modal-estudios.component';
import { ListarEstudiosComponent } from './components/estudios/listar-estudios/listar-estudios.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ListarExperienciasComponent } from './components/experience/listar-experiencias/listar-experiencias.component';
import { ModalExperienceComponent } from './components/experience/modal-experience/modal-experience.component';
import { ListarProyectosComponent } from './components/proyectos/listar-proyectos/listar-proyectos.component';
import { ModalProyectosComponent } from './components/proyectos/modal-proyectos/modal-proyectos.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ExperienceComponent,
    ConocimientosComponent,
    EstudiosComponent,
    ProyectosComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    EditaboutComponent,
    ListarConocimientosComponent,
    ModalConocimientosComponent,
    ModalEstudiosComponent,
    ListarEstudiosComponent,
    ListarExperienciasComponent,
    ModalExperienceComponent,
    ListarProyectosComponent,
    ModalProyectosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
