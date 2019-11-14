import { Component, OnInit } from "@angular/core";
import { CarreraService } from '../carrera.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyResponse, Carrera } from '../modelos';
import { MensajeService } from '../mensaje.service';

@Component({
    selector: "carrera-detalle"
    , templateUrl: "./carrera-detalle.component.html"
})

export class CarreraDetalleComponent implements OnInit {
    constructor(
        private carreras: CarreraService
        , private active_route: ActivatedRoute
        , private router: Router
        , private mensajes: MensajeService
    ) { }
    ngOnInit() {
        const self = this;
        self.active_route.params.subscribe(params => self.doget(params.id));
    }

    body = new BodyResponse<Carrera>();

    get selected() {
        const self = this;
        if (self.body.data === null) {
            self.body.data = new Carrera();
        }
        return this.body.data;
    }

    get hay_contenido() {
        const self = this;
        return self.body.total > 0 && self.selected.codigoCarrera > 0;
    }
    async doget(id) {
        const self = this;
        self.body = await self.carreras.get(id);
    }

    get upt_ready() {
        const self = this;
        return self.selected.codigoCarrera > 0 && self.selected.nombre.trim().length > 0;
    }
    async doupt() {
        const self = this;

        if (window.confirm("Guardar?")) {
            const body = await self.carreras.upt(self.selected.codigoCarrera, { ...self.selected });
            if (body.total > 0) {
                self.mensajes.create_info("Guardado...");
                window.scroll(0, 0);
            }
        }
    }
    async docreate() {
        const self = this;
        const body = await self.carreras.create({ ...self.selected });

        if (body.data && body.data.codigoCarrera > 0) {
            self.mensajes.create_info("Creado...");
            self.router.navigate(["/carreras", body.data.codigoCarrera]);
            window.scroll(0, 0);
        }
    }
    async dodel() {
        const self = this;
        if (window.confirm("Eliminar?")) {
            const body = await self.carreras.del(self.selected.codigoCarrera);
            if (body.total > 0) {
                self.mensajes.create_info("Eliminado...");
                self.router.navigate(["/carreras"]);
                window.scroll(0, 0);
            }
        }
    }
    docancel() {
        const self = this;
        self.router.navigate(["/carreras"]);
    }

}
