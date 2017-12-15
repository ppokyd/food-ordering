import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router/src/router_state';

@Injectable()
export class AuthGuardService {

  constructor(
    private appService: AppService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    if (this.appService.isPbUser()) {
      return true;
    }
    this.router.navigate(['/orders']);
  }

}
