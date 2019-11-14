import { Injectable } from '@angular/core';
import { Incorporacion, BodyResponse } from './modelos';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})

export class IncorporacionService extends AppService<Incorporacion> {
  name = "incorporaciones"
  // sel() {
  //   return new Promise<BodyResponse<Incorporacion[]>>((resolve) => {
  //     const body = new BodyResponse<Incorporacion[]>();
  //     body.data = [new Incorporacion(), new Incorporacion()];
  //     body.data[0].idIncorporacion = 1;
  //     body.data[0].carnet = 1111;
  //     body.data[0].carrera = "Carrera 1";
  //     body.data[0].institucion = "Institución 1";
  //     body.data[0].idIncorporacion = 1;
  //     body.data[0].correlativo = "EPS-ALGO-1";
  //     body.data[0].fechaInicio = new Date();
  //     body.data[0].fechaFinal = new Date();
      
  //     body.data[1].carnet = 2222;
  //     body.data[1].carrera = "Carrera 2";
  //     body.data[1].institucion = "Institución 2";
  //     body.data[1].idIncorporacion = 2;
  //     body.data[1].correlativo = "EPS-ALGO-2";
  //     body.data[1].fechaInicio = new Date();
  //     body.data[1].fechaFinal = new Date();

  //     resolve(body);
  //   });
  // }
}
