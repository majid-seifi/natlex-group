import {Routes} from '@angular/router';

export const routes: Routes = [
  // Lazy Loading Standalone Components
  {
    path: 'view-mode', loadComponent: () =>
      import('./view-mode/view-mode.component')
        .then(m => m.ViewModeComponent)
  },
  {
    path: 'settings', loadComponent: () =>
      import('./settings/settings.component')
        .then(m => m.SettingsComponent)
  },
  {path: '', redirectTo: '/view-mode', pathMatch: 'full'},
  {path: '**', redirectTo: '/view-mode'}
];
