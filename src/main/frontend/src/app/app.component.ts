import { Component } from '@angular/core';
import { MensajeService } from "./mensaje.service";
import { BodyResponse } from './modelos';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'practicas-intermedias-eps-js';

  constructor(
    public mensajes: MensajeService
    , private auth: AuthService
  ) { }


  get user_info() {
    return this.auth.selected;
  }


}

export interface SimpleListAppInterface<T> {
  body: BodyResponse<T[]>;
}