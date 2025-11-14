import { Routes } from '@angular/router';
import { MonsterComponent } from './pages/monster/monster.component';
import { VitalsComponent } from './pages/monster/vitals/vitals.component';
import { AbilitiesComponent } from './pages/monster/abilities/abilities.component';
import { ActionsComponent } from './pages/monster/actions/actions.component';
import { MonstersComponent } from './pages/monsters/monsters.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
    {
        path: 'monster/:id',
        component: MonsterComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'vitals',
                pathMatch: 'full'
            },
            {
                path: 'vitals',
                component: VitalsComponent
            },
            {
                path: 'abilities',
                component: AbilitiesComponent
            },
            {
                path: 'actions',
                component: ActionsComponent
            }
        ]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'monsters',
        component: MonstersComponent,
        canActivate: [authGuard]
    },
    {
        path: 'auth',
        component: AuthComponent,
        canActivate: [guestGuard]
    }
];
