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