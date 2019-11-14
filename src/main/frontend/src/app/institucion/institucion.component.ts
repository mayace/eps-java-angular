import { Component, OnInit } from '@angular/core';
import { InstitucionService } from "./../institucion.service";
import { Router } from "@angular/router"
import { BodyResponse, Institucion } from '../modelos';
@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
})
export class InstitucionComponent implements OnInit {

  selected = new Institucion();

  get create_ready() {
    try {
      return this.selected.nombre.trim().length > 0;
    } catch (error) {
    }
    return false;
  }
  constructor(
    public instituciones: InstitucionService
    , private router: Router
  ) { }

  ngOnInit() {
    this.dosel();
  }

  body = new BodyResponse<Institucion[]>();
  get list() {
    const self = this;
    if (!self.body.data) {
      self.body.data = [];
    }
    const nombre = self.selected.nombre.trim().toLowerCase();
    if (nombre.length > 0) {
      return self.body.data.filter(item => item.nombre.trim().toLowerCase().indexOf(nombre) >= 0);
    }
    return self.body.data;
  }

  async dosel() {
    const self = this;
    self.body = await self.instituciones.sel();
  }

}
