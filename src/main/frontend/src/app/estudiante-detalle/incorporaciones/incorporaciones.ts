import { Component, OnInit } from "@angular/core";
import { MensajeService } from 'src/app/mensaje.service';
import { ActivatedRoute } from '@angular/router';
import { IncorporacionService } from 'src/app/incorporacion.service';
import { BodyResponse, Incorporacion } from 'src/app/modelos';

@Component({
    selector: "estudiante-detalle-incorporaciones"
    , templateUrl: "./incorporaciones.html"
})

export default class EstudianteIncorporacionesComponent implements OnInit {

    constructor(
        private mensajes: MensajeService
        , private actived_route: ActivatedRoute
        , private incorporaciones: IncorporacionService
    ) { }

    ngOnInit() {
        const self = this;

        self.actived_route.pathFromRoot[1].params.subscribe(item => {
            const carnet = item.carnet;
            self.dosel({ carnet });
        });

    }

    body = new BodyResponse<Incorporacion[]>();

    get list() {
        const self = this;
        if (!self.body.data) {
            self.body.data = [];
        }
        return self.body.data;
    }

    async dosel(params: any = {}) {
        const self = this;
        // params.limit = 1;
        self.body = await self.incorporaciones.sel(params);
    }
}