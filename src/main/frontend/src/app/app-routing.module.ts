import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitucionComponent } from "./institucion/institucion.component";
import { PanelInicioComponent } from "./inicio-panel/inicio-panel.component";
import { EstudianteComponent } from "./estudiante/estudiante.component";
import { InstitucionDetalleComponent } from './institucion-detalle/institucion-detalle.component';
import EstudianteDetalleComponent from './estudiante-detalle/estudiante-detalle.component';
import EstudianteDetalleDatosComponent from './estudiante-detalle/datos/datos.component';
import EstudianteIncorporacionesComponent from './estudiante-detalle/incorporaciones/incorporaciones';
import CarreraComponent from './carrera/carrera.component';
import { CarreraDetalleComponent } from './carrera-detalle/carrera-detalle.component';
import EstudianteIncorporacionDetalleComponent from './estudiante-detalle/incorporaciones/detalle/detalle';
import { CartaComponent } from './carta/carta';
import { CartaDetalleComponent } from './carta-detalle/carta-detalle';
import { AuthRouteGuard } from './auth-route.guard';
import { LoginComponent } from './usuario/login.component';

const routes: Routes = [
  {
    path: "institucion"
    , component: InstitucionComponent
    , canActivate: [AuthRouteGuard]
  }
  , {
    path: "institucion/:idInstitucion"
    , component: InstitucionDetalleComponent
    , canActivate: [AuthRouteGuard]
  }
  , {
    path: "login"
    , component: LoginComponent
  }
  , {
    path: "cartas"
    , component: CartaComponent
    , canActivate: [AuthRouteGuard]
  }
  , {
    path: "cartas/:idCarta"
    , component: CartaDetalleComponent
    , canActivate: [AuthRouteGuard]
  }
  , {
    path: ""
    , pathMatch: "full"
    , redirectTo: "panel"
    , canActivate: [AuthRouteGuard]
  }
  , {
    path: "panel"
    , component: PanelInicioComponent
    , canActivate: [AuthRouteGuard]
  }
  , {
    path: "estudiante"
    , component: EstudianteComponent
    , canActivate: [AuthRouteGuard]
  }
  , {
    path: "estudiante/:carnet"
    , component: EstudianteDetalleComponent
    , canActivate: [AuthRouteGuard]
    , children: [
      {
        path: ""
        , pathMatch: "full"
        , redirectTo: "datos"
      }
      , {
        path: "datos"
        , component: EstudianteDetalleDatosComponent
      }
      , {
        path: "incorporaciones"
        , component: EstudianteIncorporacionesComponent
      }
      , {
        path: "incorporaciones/:id"
        , component: EstudianteIncorporacionDetalleComponent
      }
    ]
  }
  , {
    path: "carreras"
    , component: CarreraComponent
    , canActivate: [AuthRouteGuard]
  }
  , {
    path: "carreras/:id"
    , component: CarreraDetalleComponent
    , canActivate: [AuthRouteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
