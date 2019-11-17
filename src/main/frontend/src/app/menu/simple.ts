import { Component, OnInit } from "@angular/core";
import { inherits } from 'util';
import { AuthService } from '../auth.service';

@Component({
    selector: "simple-menu"
    , templateUrl: "./simple.html"
})

export class SimpleMenuComponent implements OnInit {
    
    constructor(

        private auth : AuthService
    ){
        
    }

    get exist_user(){
        const self = this;
        return self.auth.isUserAuthenticated();
    }

    ngOnInit(){
    }

    dologout(){
        this.auth.logout();
    }

}