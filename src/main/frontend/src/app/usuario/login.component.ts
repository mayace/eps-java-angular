import { OnInit, Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Usuario, RolUsuario } from '../modelos';

@Component({
    selector: "login"
    , templateUrl: "./login.component.html"
    , styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    ngOnInit(): void {
    }

    constructor(
        private auth: AuthService
    ) {

    }

    get upt_ready() {
        const self = this;
        return self.selected.nick.trim().length > 0 && self.selected.pass.trim().length > 0;
    }

    selected = new Usuario();
    async dologin() {
        const self = this;
        try {
            const body = await self.auth.auth(self.selected.nick, self.selected.pass);
            self.auth.create_session(body.data)
        } catch (e) {
            // const u = new Usuario();
            // u.idUsuario = 99;
            // u.nick = self.selected.nick;
            // u.fkIdRol = new RolUsuario();
            // u.fkIdRol.idRol = 1;
            // self.auth.create_session(u);
            console.log(e);            
        }
    }
}