import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthRouteGuard implements CanActivate {


    canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        const self = this;
        const ok = self.auth.isUserAuthenticated();
        if (!ok) {
            self.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
        }
        return ok;
    }
    constructor(private auth: AuthService
        , private router: Router
    ) {
    }

}