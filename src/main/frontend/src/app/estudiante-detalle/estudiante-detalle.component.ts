import { OnInit, Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "app-estudiante-detalle"
    , templateUrl: "./estudiante-detalle.component.html"
})

export default class EstudianteDetalleComponent implements OnInit {

    ngOnInit() {
        const self = this;
        self.route.params.subscribe(params => self.carnet = params.carnet);
    }

    constructor(
        private route: ActivatedRoute
    ) {

    }

    carnet = 0

}
