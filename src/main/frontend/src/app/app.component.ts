import { Component } from '@angular/core';
import { MensajeService } from "./mensaje.service";
import { BodyResponse } from './modelos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'practicas-intermedias-eps-js';

  constructor(public mensajes: MensajeService) { }
}

export interface SimpleListAppInterface<T> {
  body: BodyResponse<T[]>;
}