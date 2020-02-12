import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'game',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../game/game.module').then(m => m.GamePageModule)
          }
        ]
      },
      {
        path: 'paintRubric',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../paintRubric/paintRubric.module').then(m => m.PaintRubricPageModule)
          }
        ]
      },
      {
        path: 'submit',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../submit/submit.module').then(m => m.SubmitPageModule)
          }
        ]
      },
      {
        path: 'chessClock',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../chessClock/chessClock.module').then(m => m.ChessClockPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/game',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/game',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
