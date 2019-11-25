import { AppService } from './app.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario, BodyResponse } from './modelos';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: "root"
})

export class AuthService extends AppService<any> {
    name: "usuario"

    constructor(
        public http: HttpClient
        , private router: Router
        , private route: ActivatedRoute
    ) {
        super(http)
        const self = this;
        self.selected = self.read_session(self.codename);
    }

    read_session(codename): Usuario {
        const self = this;
        const str = window.localStorage.getItem(codename);

        if (str && str.trim().length > 0) {
            try {
                return <Usuario>JSON.parse(str)
            } catch (e) {
                console.log(e);
                self.logout();
            }
        }

        return new Usuario();
    }

    logout() {
        window.localStorage.removeItem(this.codename);
        window.location.href = "";
    }

    public isUserAuthenticated() {
        const self = this;
        return self.selected.idUsuario > 0;
    }

    public auth(nick: string, pass: string) {
        const self = this;

        const params = {
            nick, pass
        }
        return self.http.post<BodyResponse<Usuario>>(this.baseurl + "usuario/login", params).toPromise();
    }


    selected = new Usuario();

    create_session(user: Usuario) {
        const self = this;
        window.localStorage.setItem(self.codename, JSON.stringify(user));
        self.selected = user;

        // self.route.queryParams.subscribe(params => {
        //     self.router.navigate([params.returnUrl || "/"]);
        // })
        self.router.navigate(["/"]);

    }

    get codename() {
        return "eps-js";
    }
}