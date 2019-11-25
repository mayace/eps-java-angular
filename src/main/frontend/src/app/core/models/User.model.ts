import { Rol } from '../models/Rol.model';

export class User {
    public nombre: number;
    public nick: number;
    public correo: number;
    public fkIdRol: Rol;
}