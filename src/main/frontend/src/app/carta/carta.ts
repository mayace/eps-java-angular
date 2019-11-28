import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CartaService } from '../carta.service';
import { BodyResponse, Carta } from '../modelos';
import { Router } from '@angular/router';

@Component({
    selector: "carta"
    , templateUrl: "./carta.html"
})

export class CartaComponent implements OnInit {
    constructor(
        private cartas: CartaService
        , private router: Router
    ) {
    }

    async ngOnInit() {
        const self = this;

        self.dosel();
    }

    @Input() selected = new Carta();
    @Input("es-selector") es_selector = false

    async dosel() {
        const self = this;
        const body = await self.cartas.sel();

        self.body = body;
    }

    body = new BodyResponse<Carta[]>();
    get list() {
        const self = this;
        return self.body && self.body.data || [];
    }
    doadd() {
        const self = this;
        self.list.push(new Carta());
    }

    modal_carta_visible = false;
    @Output("selected") on_selected = new EventEmitter<Carta>();
    watch_selected(to: Carta) {
        const self = this;
        if (to) {
            self.on_selected.emit(to);
        }
    }

    async dosearch(destinatario: string) {
        const self = this;
        self.body = await self.cartas.sel({ destinatario });
    }
}
