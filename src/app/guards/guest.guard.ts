import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

// Functional guard for reverse auth (redirect logged-in users away from auth page)
export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Allow access to auth page so the component can handle the loading and redirect
  return authService.user$.pipe(
    take(1),
    map(user => {
      if (!user) {
        return true;
      } else {
        // User is logged in, redirect to home or returnUrl if provided
        const returnUrl = route.queryParams['returnUrl'] || '/home';
        router.navigate([returnUrl]);
        return false;
      }
    })
  );
};

