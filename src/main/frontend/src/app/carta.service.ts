import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MensajeService } from "./mensaje.service";
import { BodyResponse, Estudiante, Carta } from './modelos';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class CartaService extends AppService<Carta> {
  name = "cartas"

}
