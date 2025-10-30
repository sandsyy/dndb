import { Routes } from '@angular/router';
import { MonsterComponent } from './pages/monster/monster.component';
import { VitalsComponent } from './pages/monster/vitals/vitals.component';
import { AbilitiesComponent } from './pages/monster/abilities/abilities.component';
import { ActionsComponent } from './pages/monster/actions/actions.component';

export const routes: Routes = [
    {
        path: 'monster/:id',
        component: MonsterComponent,
        children: [
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
    }
];
