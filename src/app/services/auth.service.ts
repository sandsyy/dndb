import { Injectable, NgZone } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private auth: Auth,
    private ngZone: NgZone
  ) {
    this.user$ = authState(this.auth);
  }

  async loginWithGoogle(): Promise<User | null> {
    try {
      console.log('AuthService: Creating Google provider...');
      const provider = new GoogleAuthProvider();
      
      // Ensure Firebase call runs within Angular's zone
      return await this.ngZone.run(async () => {
        console.log('AuthService: Calling signInWithPopup...');
        const result = await signInWithPopup(this.auth, provider);
        console.log('AuthService: Sign in successful, user:', result.user?.email);
        return result.user;
      });
    } catch (error: any) {
      console.error('AuthService: Google login error:', error);
      console.error('AuthService: Error code:', error?.code);
      console.error('AuthService: Error message:', error?.message);
      
      // Provide helpful error messages for common popup issues
      if (error?.code === 'auth/popup-closed-by-user') {
        const helpfulError = new Error('Login popup was closed. This may be due to browser security settings (Cross-Origin-Opener-Policy) or the popup being closed manually. Please check your browser settings and try again.');
        (helpfulError as any).code = error.code;
        throw helpfulError;
      } else if (error?.code === 'auth/popup-blocked') {
        const helpfulError = new Error('Popup was blocked by your browser. Please allow popups for localhost:4200 and try again.');
        (helpfulError as any).code = error.code;
        throw helpfulError;
      }
      
      throw error;
    }
  }

  async loginWithGoogleRedirect(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await this.ngZone.run(async () => {
      await signInWithRedirect(this.auth, provider);
    });
  }

  async getRedirectResult(): Promise<User | null> {
    try {
      const result = await this.ngZone.run(async () => {
        return await getRedirectResult(this.auth);
      });
      return result?.user || null;
    } catch (error) {
      console.error('Error getting redirect result:', error);
      return null;
    }
  }

  async registerWithGoogle(): Promise<User | null> {
    // Google registration is the same as login
    return this.loginWithGoogle();
  }

  async loginWithEmail(email: string, password: string): Promise<User | null> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return result.user;
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    }
  }

  async registerWithEmail(email: string, password: string): Promise<User | null> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      return result.user;
    } catch (error) {
      console.error('Email registration error:', error);
      throw error;
    }
  }
  
  async logout(): Promise<void> {
    try {
      // Clear user profile cache before logout
      this.clearUserProfileCache();
      await signOut(this.auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  private clearUserProfileCache(): void {
    try {
      localStorage.removeItem('user_profile_cache');
      localStorage.removeItem('user_profile_timestamp');
    } catch (error) {
      console.error('Error clearing user profile cache:', error);
    }
  }

  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }

  // Helper method to get current user synchronously (returns null if not authenticated)
  getCurrentUserSync(): User | null {
    return this.auth.currentUser;
  }
}

