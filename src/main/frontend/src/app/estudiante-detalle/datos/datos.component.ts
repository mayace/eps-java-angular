import { OnInit, Component } from "@angular/core";
import { Estudiante, BodyResponse, Carrera, estudianteCarreraListItem } from 'src/app/modelos';
import { EstudianteService } from 'src/app/estudiante.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { MensajeService } from 'src/app/mensaje.service';
import { CarreraService } from 'src/app/carrera.service';

@Component({
    selector: "estudiante-detalle-datos"
    , templateUrl: "./datos.html"
})

export default class EstudianteDetalleDatosComponent implements OnInit {
    constructor(
        private estudiantes: EstudianteService
        , private router: Router
        , private active_route: ActivatedRoute
        , private mensajes: MensajeService
        , private carreras: CarreraService
    ) {

    }

    async ngOnInit() {
        const self = this;
        self.active_route.pathFromRoot[1].params.subscribe(params => self.doget(params.carnet));
        self.body_carrera = await self.carreras.sel();
    }
    async doget(carnet: Number) {
        const self = this;
        self.body = await self.estudiantes.get(carnet);
        self.read_only = self.body.data && self.body.data.carnet > 0 || false;
    }

    body = new BodyResponse<Estudiante>();
    body_carrera = new BodyResponse<Carrera[]>();

    carrera_selected: Carrera = null;

    get carrera_list() {
        const self = this;
        return self.body_carrera.data;
    }

    get selected() {
        const self = this
        if (!self.body.data) {
            self.body.data = new Estudiante();
        }
        return <Estudiante>self.body.data;
    }
    public read_only = true

    add_carrera(carrera: Carrera) {
        const self = this;
        if (carrera) {
            const item = new estudianteCarreraListItem();
            item.fkCarrera = carrera;
            self.selected.estudianteCarreraList.push(item);
        }
    }

    // https://stackoverflow.com/a/46181
    email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    get upt_ready() {
        const self = this;
        const has_carnet = self.selected.carnet > 0;
        const has_cui = self.selected.cui > 0;
        const has_nombre = self.selected.nombre.trim().length > 0;

        let has_email = true;
        const email = self.selected.correo.trim();
        if (email.length > 0) {
            has_email = self.email_regex.test(email);
        }
        // const has_carnet = self.selected.carnet > 0;
        return has_carnet && has_cui && has_nombre && has_email;
    }

    get hay_contenido() {
        const self = this;
        return self.body.total > 0 && self.selected.carnet > 0;
    }

    async docreate() {
        const self = this;

        const body = await self.estudiantes.create({ ...self.selected });

        const data = <Estudiante>body.data;
        if (data && data.carnet > 0) {
            self.mensajes.create_info("Estudiante registrado.");
            self.router.navigate(["/estudiante", data.carnet]);
            window.scroll(0, 0);
        }

    }
    docancel() {
        window.location.reload();
    }
    async doupt() {
        const self = this;
        const body = await self.estudiantes.upt(self.selected.carnet, { ...self.selected });

        if (body.total > 0) {
            self.mensajes.create_info("Estudiante actualizado");
            self.read_only = true;
            window.scroll(0, 0);
        }
    }

    async dodel() {
        const self = this;
        if (window.confirm("¿Esta seguro de eliminar?")) {
            const body = await self.estudiantes.del(self.selected.carnet);
            if (body.total > 0) {
                self.mensajes.create_info("Estudiante eliminado");
                self.router.navigate(["/estudiante"]);
                window.scroll(0, 0);
            }
        }

    }
}

