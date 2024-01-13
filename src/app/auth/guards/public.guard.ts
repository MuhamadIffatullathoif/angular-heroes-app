import {CanActivateFn, CanMatchFn, Router} from '@angular/router';
import {map, Observable, tap} from "rxjs";
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

const checkAuthStatus = () : boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          router.navigate(['./']);
        }
      }),
      map(isAuth => !isAuth)
    )
}

export const canActiveGuardPrinciple: CanActivateFn = (route, state) => {
  return checkAuthStatus();
};

export const canMatchGuardPrinciple: CanMatchFn = () => {
  return checkAuthStatus();
}
