import {CanActivateFn, CanMatchFn, Router} from '@angular/router';
import {Observable, tap} from "rxjs";
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

const checkAuthStatus = () : boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          router.navigate(['/auth/login']);
        }
      })
    )
}

export const authGuard: CanActivateFn = (route, state) => {
  return checkAuthStatus();
};

export const canMatchGuard: CanMatchFn = () => {
  return checkAuthStatus();
}
