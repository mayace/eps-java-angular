import { Injectable } from '@angular/core';
import { Institucion } from './modelos';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService extends AppService<Institucion> {
  name = "instituciones"
}
