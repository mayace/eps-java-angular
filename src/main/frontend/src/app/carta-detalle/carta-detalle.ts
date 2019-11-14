import { Component, OnInit, Input } from "@angular/core";
import { CartaService } from '../carta.service';
import { BodyResponse, Carta, CartaDetalle } from '../modelos';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeService } from '../mensaje.service';


@Component({
    selector: "carta-detalle"
    , templateUrl: "./carta-detalle.html"
})

export class CartaDetalleComponent implements OnInit {
    constructor(
        private cartas: CartaService
        , private route: ActivatedRoute
        , private mensajes: MensajeService
        , private router: Router
    ) {
    }

    read_only = true;

    get upt_ready() {
        const self = this;
        const has_nombre = self.selected.destinatario.trim().length > 0;

        const has_detalle = self.selected.detalleCartaList.length > 0
            && -1 === self.selected.detalleCartaList.findIndex(item => {
                return item.cargo.trim().length === 0 || item.dirigidoA.trim().length === 0
            });

        return has_nombre && has_detalle;
    }

    async ngOnInit() {
        const self = this;
        self.route.params.subscribe(params => self.doget(params.idCarta));
    }
    async doget(idCarta: number) {
        const self = this;
        if (idCarta > 0) {
            self.body = await self.cartas.get(idCarta);
        } else {
            self.read_only = false;
            self.body.data = new Carta();
        }
    }

    get selected() {
        const self = this;
        return self.body.data || new Carta();
    }

    get hay_contenido() {
        const self = this;
        return self.body.total > 0 && self.body.data && self.body.data.idCarta > 0 || false;
    }

    body = new BodyResponse<Carta>();
    get list() {
        const self = this;
        return self.body && self.body.data || [];
    }

    doadd_detalle() {
        const self = this;
        self.selected.detalleCartaList.push(new CartaDetalle());
    }

    async doupt() {
        const self = this;
        if (window.confirm("Guardar?")) {
            const body = await self.cartas.upt(self.selected.idCarta, { ...self.selected });
            if (body.total > 0) {
                self.mensajes.create_info("Grupo Guardado");
            }
        }
    }
    async dodel() {
        const self = this;
        if (window.confirm("Eliminar?")) {
            const body = await self.cartas.del(self.selected.idCarta);
            if (body.total > 0) {
                self.mensajes.create_info("Grupo eliminado.");
                self.router.navigate(["/cartas"]);
            }
        }
    }

    async docreate() {
        const self = this;
        const body = await self.cartas.create({ ...self.selected });
        if (body.total > 0 && body.data && body.data.idCarta > 0) {
            self.mensajes.create_info("¡Grupo '" + body.data.destinatario + "' creado!");
        }
    }
}

