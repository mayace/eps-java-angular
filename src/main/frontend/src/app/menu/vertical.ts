import { Component, OnInit } from "@angular/core";
import { AuthService } from '../auth.service';

@Component({
    selector: "vertical-menu"
    , templateUrl: "./vertical.html"
})

export class VerticalMenuComponent implements OnInit {
    constructor(
        private auth: AuthService
    ) {

    }

    get is_admin(){
        const self = this;
        return self.user_info && self.user_info.fkIdRol && self.user_info.fkIdRol.idRol === 1 || false;
    }

    get user_info(){
        return this.auth.selected;
    }

    get exist_user() {
        const self = this;
        return self.auth.isUserAuthenticated();
    }

    ngOnInit() {
    }

    dologout() {
        this.auth.logout();
    }
}