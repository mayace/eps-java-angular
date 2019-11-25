import { Component, OnInit } from '@angular/core';
import { InstitucionService } from "../institucion.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MensajeService } from '../mensaje.service';
import { Institucion, DetalleInstitucion, BodyResponse } from "../modelos"
@Component({
  selector: 'app-institucion-detalle',
  templateUrl: './institucion-detalle.component.html',
})
export class InstitucionDetalleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
    , public instituciones: InstitucionService
    , private router: Router
    , private mensajes: MensajeService
  ) { }

  public read_only: Boolean = true

  get upt_ready() {
    const self = this;
    const has_nombre = self.selected.nombre && self.selected.nombre.trim().length > 0 || false;
    const has_detalle = self.selected.detalleInstitucion.length > 0
      && 0 === self.selected.detalleInstitucion.filter(item => !(item.telefono > 0) || item.ubicacion.trim().length === 0).length;
    return has_nombre && has_detalle;
  }
  get hay_contenido() {
    const self = this;
    return self.selected.idInstitucion > 0;
  }
  get selected() {
    const self = this;
    if (!self.body.data) {
      self.body.data = new Institucion();
    }
    return self.body.data;
  }

  body = new BodyResponse<Institucion>();

  get list() {
    const self = this
    return self.selected && self.selected.detalleInstitucion || [];
  }


  ngOnInit() {
    const self = this;
    self.route.params.subscribe(params => {
      const idInstitucion = params.idInstitucion;

      if (idInstitucion > 0) {
        self.doget(idInstitucion);
      } else {
        self.body.data = new Institucion();
        self.read_only = false;
      }
    });
  }

  async doget(idInstitucion: Number) {
    const self = this;
    self.body = await self.instituciones.get(idInstitucion);
    self.read_only = self.selected.idInstitucion > 0;
  }
  doedit(item) {
    if (item) {
      item.backup = {};
      item.backup.idDetalleInstitucion = item.idDetalleInstitucion;
      item.backup.telefono = item.telefono;
      item.backup.ubicacion = item.ubicacion;
      item.upt_ready = false;
      item.read_only = false;
    }
  }
  docancel(item) {
    window.location.reload();
  }

  async docreate() {
    const self = this;
    const body = await self.instituciones.create({ ...self.selected });

    const data = <Institucion>body.data;
    if (data.idInstitucion > 0) {
      self.mensajes.create_info("Institución creada.");
      self.router.navigate(["/institucion/" + data.idInstitucion]);
    }
  }


  doadd() {
    const self = this;
    self.list.push(new DetalleInstitucion());
  }

  async doupt() {
    const self = this;
    const data = { ...self.selected };
    const body = await self.instituciones.upt(self.selected.idInstitucion, data);
    if (body && body.total > 0) {
      self.mensajes.create_info("¡Hecho!");
      self.read_only = true;
    }
  }

  async dodel() {
    if (confirm("¿Estas seguro de eliminar la institución?")) {
      const body = await this.instituciones.del(this.selected.idInstitucion);

      if (body.total > 0) {
        this.router.navigate(["/institucion"])
      }
    }
  }
}
