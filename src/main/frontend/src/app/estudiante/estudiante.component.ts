import { Component, OnInit } from '@angular/core';
import { EstudianteService } from "./../estudiante.service";
import { BodyResponse, Estudiante } from '../modelos';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
})
export class EstudianteComponent implements OnInit {

  constructor(public estudiantes: EstudianteService) { }

  ngOnInit() {
    const self = this;
    self.dosel();
  }

  body = new BodyResponse<Estudiante[]>();
  selected = new Estudiante();
  get list() {
    const self = this;
    return (self.body.data || []).filter(item => item.carnet.toString().indexOf(self.selected.carnet.toString()));
  }

  async dosel() {
    const self = this;
    self.body = await self.estudiantes.sel();
  }
}
