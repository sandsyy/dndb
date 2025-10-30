import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';
import { Sun, Sunrise, Dice6, MapPin, ChevronLeft, Dot, CircleAlert, Mail, CloudSun, Cloud, Droplet, Droplets, DropletOff, Sprout, CalendarSync, Calendar, Utensils, ExternalLink, FileText, Moon, Globe, BookOpen, Leaf, Pill, Repeat, Apple, X, Search, ChevronDown, ChevronUp, Undo2, ChevronRight, Inbox, Star, User, Settings } from 'lucide-angular';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(LucideAngularModule.pick({ Sunrise, Dice6, MapPin, ChevronLeft, Dot, CircleAlert, Mail, Sun, CloudSun, Cloud, Droplet, Droplets, DropletOff, Sprout, CalendarSync, Calendar, Utensils, ExternalLink, FileText, Moon, Globe, BookOpen, Leaf, Pill, Repeat, Apple, X, Search, ChevronDown, ChevronUp, Undo2, ChevronRight, Inbox, Star, User, Settings })),
  ]
};
