import { Component, OnInit, OnChanges, Input, SimpleChange, SimpleChanges, ViewChild, ElementRef } from "@angular/core";
import { MensajeService } from 'src/app/mensaje.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IncorporacionService } from 'src/app/incorporacion.service';
import { BodyResponse, Incorporacion, Estudiante, Institucion, Carta, CartaDetalle } from 'src/app/modelos';
import { EstudianteService } from 'src/app/estudiante.service';
import { InstitucionService } from 'src/app/institucion.service';
import { NgbDateStruct, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from "file-saver";

declare let $: any;
declare let PizZipUtils: any;
// https://stackoverflow.com/a/35961176
const Docxtemplater = require('docxtemplater');
const PizZip = require("pizzip");

@Component({
    selector: "estudiante-incorporacion-detalle"
    , templateUrl: "./detalle.html"
    , providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})

export default class EstudianteIncorporacionDetalleComponent implements OnInit, OnChanges {

    constructor(
        private mensajes: MensajeService
        , private actived_route: ActivatedRoute
        , private incorporaciones: IncorporacionService
        , private estudiantes: EstudianteService
        , private instituciones: InstitucionService
        , private router: Router
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes)
    }
    async ngOnInit() {
        const self = this;
        self.dosel_insitucion();

        self.actived_route.pathFromRoot[1].params.subscribe(params => {
            self.estudiante_doget(params.carnet);
            self.carnet = params.carnet;
        });
        self.actived_route.pathFromRoot[2].params.subscribe(params => {
            self.doget(params.id);
        });
    }

    carnet = 0

    get list_institucion() {
        const self = this;
        return self.body_insitucion && self.body_insitucion.data || [];
    }

    get selected() {
        const self = this;
        if (!self.body.data) {
            self.body.data = new Incorporacion();
        }
        return self.body.data;
    }

    body_insitucion = new BodyResponse<Institucion[]>();
    body_estudiante = new BodyResponse<Estudiante>();
    body = new BodyResponse<Incorporacion>()
    public read_only = true;

    async dosel_insitucion() {
        const self = this;
        self.body_insitucion = await self.instituciones.sel();
    }

    async estudiante_doget(carnet) {
        const self = this;
        self.body_estudiante = await self.estudiantes.get(carnet);
    }

    get duracion_eps() {
        const self = this;
        const tf = new Date(self.selected.fechaFinal || null);
        const ti = new Date(self.selected.fechaInicio || null);

        const dm = tf.getMonth() - ti.getMonth();
        const dy = tf.getFullYear() - ti.getFullYear();
        const diff = 12 * dy + dm;

        return Math.max(0, diff);
    }

    get duracion_eps_seguro() {
        const self = this;
        const tf = new Date(self.selected.fechaFinalSeguro);
        const ti = new Date(self.selected.fechaInicioSeguro);

        const dm = tf.getMonth() - ti.getMonth();
        const dy = tf.getFullYear() - ti.getFullYear();
        const diff = 12 * dy + dm;

        return Math.max(0, diff);
    }

    get has_correlativo() {
        const self = this;
        return self.selected.correlativoDoc > 0;
    }

    get has_semestre() {
        const self = this;
        return self.selected.semestre > 0;
    }

    get has_cartas() {
        const self = this;
        return self.selected.fkCarta && self.selected.fkCarta.idCarta > 0 || false;
    }

    get has_institucion() {
        const self = this;
        return self.selected.fkInstitucion && self.selected.fkInstitucion.idInstitucion > 0 || false;
    }
    get has_asesor() {
        const self = this;
        return self.selected.asesor.trim().length > 0;
    }
    get has_supervisor() {
        const self = this;
        return self.selected.supervisor.trim().length > 0;
    }
    get has_asesor_supervisor() {
        const self = this;
        return self.selected.asesorSupervisor.trim().length > 0;
    }

    get has_duracion_eps(){
        const self =this;
        return self.duracion_eps > 0;
    }
    get upt_ready() {
        const self = this;

        return self.has_cartas
            && self.has_institucion
            && self.has_asesor
            && self.has_asesor_supervisor
            && self.has_supervisor
            && self.has_semestre
            && self.has_correlativo
            && self.has_duracion_eps;
    }

    get hay_contenido() {
        const self = this;
        return self.body.total > 0 && self.body.data.idIncorporacion > 0;
    }

    get estudiante() {
        const self = this;
        return self.body_estudiante && self.body_estudiante.data || new Estudiante();
    }

    async doget(id: number) {
        const self = this;
        if (id == 0) {
            self.read_only = false;
            self.selected.fkInstitucion = new Institucion();
            self.selected.fkCarta = new Carta();
            return 0;
        }
        self.body = await self.incorporaciones.get(id);
        if (self.body && self.body.data) {
            self.body.data.fechaInicio = new Date(self.body.data.fechaInicio);
            self.body.data.fechaFinal = new Date(self.body.data.fechaFinal);
            self.body.data.fechaInicioSeguro = new Date(self.body.data.fechaInicioSeguro);
            self.body.data.fechaFinalSeguro = new Date(self.body.data.fechaFinalSeguro);

            if (self.body.data.fkInstitucion) {
                const found = self.list_institucion.find(item => item.idInstitucion = self.body.data.fkInstitucion.idInstitucion);
                if (found) {
                    self.body.data.fkInstitucion = found;
                }
            }
        }
    }
    async dodel() {
        const self = this;
        if (window.confirm("¿Eliminar incorporación?")) {
            const body = await self.incorporaciones.del(self.selected.idIncorporacion);
            if (body.total > 0) {
                self.mensajes.create_info("Incorporación eliminada.");
                self.router.navigate(["/estudiante",self.carnet,"incorporaciones"]);
            }
        }
    }
    async doupt() {
        const self = this;
        const body = await self.incorporaciones.upt(self.selected.idIncorporacion, { ...self.selected });
        self.selected.tiempoEps = self.duracion_eps;
        if (body.total > 0) {
            self.mensajes.create_info("Incorporación guardada.");
            self.read_only = true;
        }
    }
    async docreate() {
        const self = this;
        self.selected.fkEstudianteCarnet = self.body_estudiante.data;
        self.selected.tiempoEps = self.duracion_eps;
        self.selected.fechaIncorporacion = new Date();
        const body = await self.incorporaciones.create({ ...self.selected });
        if (body.data && body.data.idIncorporacion > 0) {
            self.mensajes.create_info("Incorporación creada.");
            self.router.navigate(["/estudiante", self.body_estudiante.data.carnet, "incorporaciones", body.data.idIncorporacion])
            self.read_only = true;
        }
    }

    // https://docxtemplater.readthedocs.io/en/latest/generate.html
    // http://www.ludovicperrichon.com/update-docx-with-js-and-optianally-upload-it-to-sp/#replace
    dodownload(detalle: CartaDetalle, tipo = "privado") {
        const self = this;

        const urls = {
            privado: {
                url: "assets/cartas/Privado.docx"
            }
            , practica: {
                url: "assets/cartas/Practicas.docx"
            }
            , protocolo: {
                url: "assets/cartas/Protocolo.docx"
            }
        }

        PizZipUtils.getBinaryContent(urls[tipo].url, function (error, content) {
            if (error) {
                console.log(error);
                alert(error);
            }

            var zip = new PizZip(content);
            var doc = new Docxtemplater().loadZip(zip)
            const now = new Date();
            const nombreCarrera = self.estudiante.estudianteCarreraList && self.estudiante.estudianteCarreraList[0] && self.estudiante.estudianteCarreraList[0].fkCarrera.nombre || null;

            doc.setData({
                dirigidoA: detalle.dirigidoA
                , day: now.getDay()
                , month: now.getMonth()
                , year: now.getFullYear()
                , nombreEstudiante: self.estudiante.nombre
                , dpiEstudiante: self.estudiante.cui
                , carnetEstudiante: self.estudiante.carnet
                , nombreInstitucion: self.selected.fkInstitucion.nombre
                , nombreCarrera
                , asunto: "solicitud"
            });

            try {
                // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
                doc.render()
            }
            catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({ error: e }));
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
                throw error;
            }

            var out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            }) //Output the document using Data-URI

            // https://github.com/eligrey/FileSaver.js/
            saveAs(out, self.estudiante.carnet + "-" + detalle.dirigidoA + "-" + tipo + ".docx");
        });
    }

    docancel() {
        const self = this;
        self.ngOnInit();
        self.read_only = true;
    }
}