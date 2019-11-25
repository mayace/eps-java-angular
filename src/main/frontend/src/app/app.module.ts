import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { InstitucionComponent } from './institucion/institucion.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EstudianteComponent } from './estudiante/estudiante.component';
import EstudianteDetalleComponent from './estudiante-detalle/estudiante-detalle.component';
import { PanelInicioComponent } from './inicio-panel/inicio-panel.component';
import { InstitucionDetalleComponent } from './institucion-detalle/institucion-detalle.component';
import { AppInterceptor } from "./app.interceptor"
import EstudianteDetalleDatosComponent from './estudiante-detalle/datos/datos.component';
import EstudianteIncorporacionesComponent from './estudiante-detalle/incorporaciones/incorporaciones';
import CarreraComponent from './carrera/carrera.component';
import { CarreraDetalleComponent } from './carrera-detalle/carrera-detalle.component';
import EstudianteIncorporacionDetalleComponent from './estudiante-detalle/incorporaciones/detalle/detalle';
import { SimpleMenuComponent } from './menu/simple';
import { InstitucionListComponent } from './institucion/InstitucionList';
import { CartaComponent } from './carta/carta';
import { CartaDetalleComponent } from './carta-detalle/carta-detalle';
import { AuthRouteGuard } from './auth-route.guard';
import { LoginComponent } from './usuario/login.component';
import { VerticalMenuComponent } from './menu/vertical';

@NgModule({
  declarations: [
    AppComponent,
    InstitucionComponent,
    EstudianteComponent,
    EstudianteDetalleComponent,
    PanelInicioComponent,
    InstitucionDetalleComponent
    , EstudianteDetalleDatosComponent
    , EstudianteIncorporacionesComponent
    , EstudianteIncorporacionDetalleComponent
    , CarreraComponent
    , CarreraDetalleComponent
    , SimpleMenuComponent
    , InstitucionListComponent
    , CartaComponent
    , CartaDetalleComponent
    , LoginComponent
    , VerticalMenuComponent
=======

@NgModule({
  declarations: [
    AppComponent
>>>>>>> fix/proyect
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
