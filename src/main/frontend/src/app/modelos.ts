export class Incorporacion {

    public idIncorporacion = 0
    public asesor = ""
    public asesorSupervisor = ""
    public correlativoDoc = 0
    public fechaIncorporacion: Date = null
    public fechaFinal: Date = null
    public fechaFinalSeguro: Date = null
    public fechaInicio: Date = null
    public fechaInicioSeguro: Date = null
    public semestre = 0
    public supervisor = ""
    public tiempoEps = 0
    public fkEstudianteCarnet: Estudiante
    public fkInstitucion: Institucion
    public fkCarta: Carta
}

export class Carta {
    public destinatario = ""
    public idCarta = 0
    public detalleCartaList: CartaDetalle[] = []
}

export class CartaDetalle {
    public dirigidoA = ""
    public cargo = ""
    public idDetalleCarta = 0
}
export class Carrera {
    public codigoCarrera = 0
    public nombre = ""
}

export class estudianteCarreraListItem {
    public fkCarrera: Carrera
}

export class Estudiante {
    public carnet: number = 0
    public cui: number = 0
    public nombre: String = ""
    public telefono: number = 0
    public correo: String = ""
    public estudianteCarreraList: estudianteCarreraListItem[] = []
}

export class Institucion {
    public idInstitucion: number = 0
    public nombre: string = ""
    public detalleInstitucion: DetalleInstitucion[] = []
}

export class DetalleInstitucion {
    public telefono: Number = 0
    public ubicacion: String = ""
}

export class BodyResponse<T> {
    public data: T = null
    public error: any = null
    public total: Number = 0
    public limi: Number = 0
    public skip: Number = 0
}