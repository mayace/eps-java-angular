import { Component, OnInit } from "@angular/core";
import { CarreraService } from '../carrera.service';
import { BodyResponse, Carrera } from '../modelos';

@Component({
    selector: "app-carrera"
    , templateUrl: "./carrera.component.html"
})

export default class CarreraComponent implements OnInit {

    constructor(
        private carreras: CarreraService
    ) { }


    ngOnInit() {
        this.dosel();
    }

    get list() {
        const self = this;
        return (self.body.data || []).filter(item => item.nombre.toLocaleLowerCase().indexOf(self.selected.nombre.toLocaleLowerCase()) >= 0)
    }

    body = new BodyResponse<Carrera[]>();
    selected = new Carrera();
    async dosel() {
        const self = this;
        self.body = await self.carreras.sel();
    }


}