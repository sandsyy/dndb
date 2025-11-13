import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { Menu, Sun, Sunrise, Dice6, MapPin, ChevronLeft, Dot, CircleAlert, Mail, CloudSun, Cloud, Droplet, Droplets, DropletOff, Sprout, CalendarSync, Calendar, Utensils, ExternalLink, FileText, Moon, Globe, BookOpen, Leaf, Pill, Repeat, Apple, X, Search, ChevronDown, ChevronUp, Undo2, ChevronRight, Inbox, Star, User, Settings, Filter } from 'lucide-angular';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebaseConfig } from './config/firebase.config';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(LucideAngularModule.pick({ Menu,Sunrise, Dice6, MapPin, ChevronLeft, Dot, CircleAlert, Mail, Sun, CloudSun, Cloud, Droplet, Droplets, DropletOff, Sprout, CalendarSync, Calendar, Utensils, ExternalLink, FileText, Moon, Globe, BookOpen, Leaf, Pill, Repeat, Apple, X, Search, ChevronDown, ChevronUp, Undo2, ChevronRight, Inbox, Star, User, Settings, Filter })),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ]
};
