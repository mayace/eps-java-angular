import { Component, OnInit } from '@angular/core';
import { Incorporacion, BodyResponse } from '../modelos';
import { IncorporacionService } from '../incorporacion.service';

@Component({
  selector: 'app-inicio-panel',
  templateUrl: './inicio-panel.component.html',
})
export class PanelInicioComponent implements OnInit {

  constructor(
    private incorporaciones: IncorporacionService
  ) { }

  ngOnInit() {
    this.dosel();
  }

  incorporacion_body = new BodyResponse<Incorporacion[]>();
  async dosel() {
    const self = this;
    self.incorporacion_body = await self.incorporaciones.sel();
  }

  get incorporacion_list(): Incorporacion[] {
    const self = this;
    if (!self.incorporacion_body.data) {
      self.incorporacion_body.data = [];
    }
    return self.incorporacion_body.data;
  }

}
