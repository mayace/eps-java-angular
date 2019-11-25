import { Component } from '@angular/core';
<<<<<<< HEAD
import { MensajeService } from "./mensaje.service";
import { BodyResponse } from './modelos';
import { AuthService } from './auth.service';
=======
>>>>>>> fix/proyect

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
<<<<<<< HEAD
  title = 'practicas-intermedias-eps-js';

  constructor(
    public mensajes: MensajeService
    , private auth: AuthService
  ) { }


  get user_info() {
    return this.auth.selected;
  }


=======
  title = 'frontend';
>>>>>>> fix/proyect
}
