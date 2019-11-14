import { AppService } from './app.service';
import { Injectable } from '@angular/core';
import { Carrera, BodyResponse } from './modelos';

@Injectable({
    providedIn: "root"
})

export class CarreraService extends AppService<Carrera> {
    name = "carreras"

    // sel(params?) {
    //     return new Promise<BodyResponse<Carrera[]>>((resolve) => {
    //         const body = new BodyResponse<Carrera[]>();
    //         body.data = [ new Carrera()];
    //         body.data[0].nombre = "ejemplo";
    //         resolve(body);
    //     });
    // }
}


