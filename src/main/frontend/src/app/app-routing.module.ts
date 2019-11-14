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

const routes: Routes = [
  {
    path: "institucion"
    , component: InstitucionComponent
  }
  , {
    path: "institucion/:idInstitucion"
    , component: InstitucionDetalleComponent
  }
  , {
    path: "cartas"
    , component: CartaComponent
  }
  , {
    path: "cartas/:idCarta"
    , component: CartaDetalleComponent
  }
  , {
    path: ""
    , pathMatch: "full"
    , redirectTo: "panel"
  }
  , {
    path: "panel"
    , component: PanelInicioComponent
  }
  , {
    path: "estudiante"
    , component: EstudianteComponent
  }
  , {
    path: "estudiante/:carnet"
    , component: EstudianteDetalleComponent
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
  }
  , {
    path: "carreras/:id"
    , component: CarreraDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
