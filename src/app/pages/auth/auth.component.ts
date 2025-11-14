import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom, filter, take } from 'rxjs';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [ButtonComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check for redirect result from Google auth (if using redirect flow)
    this.authService.getRedirectResult().then(user => {
      if (user) {
        console.log('Redirect login successful, user:', user.email);
        this.redirectAfterLogin();
      } else {
        // Check if user is already logged in and redirect
        this.authService.user$.pipe(
          take(1),
          filter(user => user !== null)
        ).subscribe(user => {
          if (user) {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
            this.router.navigate([returnUrl]);
          }
        });
      }
    });
  }

  private async redirectAfterLogin(): Promise<void> {
    // Wait for auth state to update before redirecting
    try {
      await firstValueFrom(
        this.authService.user$.pipe(
          filter(user => user !== null),
          take(1)
        )
      );
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
      this.router.navigate([returnUrl]);
    } catch (error) {
      console.error('Error waiting for auth state:', error);
    }
  }

  async onGoogleLogin(): Promise<void> {
    try {
      console.log('Starting Google login...');
      const user = await this.authService.loginWithGoogle();
      console.log('Google login successful, user:', user);
      await this.redirectAfterLogin();
    } catch (error) {
      console.error('Google login failed:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : String(error),
        name: error instanceof Error ? error.name : 'Unknown',
        stack: error instanceof Error ? error.stack : undefined,
        code: (error as any)?.code,
        customData: (error as any)?.customData
      });
    }
  }

  onFacebookLogin(): void {
    // TODO: Implement Facebook login
    console.log('Facebook login not yet implemented');
  }

  onAppleLogin(): void {
    // TODO: Implement Apple login
    console.log('Apple login not yet implemented');
  }

  onEmailLogin(): void {
    // TODO: Implement email login (user will handle this later)
    console.log('Email login not yet implemented');
  }

  onGuestLogin(): void {
    // TODO: Implement guest login
    console.log('Guest login not yet implemented');
  }
}
