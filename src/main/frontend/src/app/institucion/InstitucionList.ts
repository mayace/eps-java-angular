import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from "@angular/core";
import { InstitucionService } from '../institucion.service';
import { Institucion, BodyResponse } from '../modelos';

@Component({
    selector: "institucion-list"
    , templateUrl: "./InstitucionList.html"
})

export class InstitucionListComponent implements OnInit, OnChanges {
    constructor(
        private instituciones: InstitucionService
    ) {
    }

    @Input() selected = new Institucion();
    @Output() changed = new EventEmitter<Institucion>();

    ngOnChanges(){
        console.log(arguments)
    }

    get list() {
        const self = this;
        return self.body && self.body.data || [];
    }

    body = new BodyResponse<Institucion[]>();
    async ngOnInit() {
        const self = this;
        self.body = await self.instituciones.sel();
    }

    readonly = true;
}
