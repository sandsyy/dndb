import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.user$ = authState(this.auth);
  }

  async loginWithGoogle(): Promise<User | null> {
    try {
      const provider = new GoogleAuthProvider();
      
      // Configure popup to open in center of screen
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const popupWidth = 520;
      const popupHeight = 600;
      
      const left = Math.round((screenWidth - popupWidth) / 2);
      const top = Math.round((screenHeight - popupHeight) / 2);
      
      // Add popup parameters to provider
      provider.setCustomParameters({
        'popup_width': popupWidth.toString(),
        'popup_height': popupHeight.toString(),
        'popup_left': left.toString(),
        'popup_top': top.toString()
      });
      
      const result = await signInWithPopup(this.auth, provider);
      return result.user;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
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

