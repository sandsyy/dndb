import { Routes } from '@angular/router';
import { MonsterComponent } from './pages/monster/monster.component';
import { VitalsComponent } from './pages/monster/vitals/vitals.component';
import { AbilitiesComponent } from './pages/monster/abilities/abilities.component';
import { ActionsComponent } from './pages/monster/actions/actions.component';
import { MonstersComponent } from './pages/monsters/monsters.component';

export const routes: Routes = [
    {
        path: 'monster/:id',
        component: MonsterComponent,
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
        path: '',
        redirectTo: 'monsters',
        pathMatch: 'full'
    },
    {
        path: 'monsters',
        component: MonstersComponent
    }
];
