import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('./tab1/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('./tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('./tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: 'location',
        loadChildren: () =>
          import('./location/location.module').then(
            (m) => m.LocationPageModule
          ),
      },
      {
        path: 'admin',
        children: [
          {
            path: 'class', // Ruta anidada bajo 'admin'
            loadChildren: () =>
              import('./admin/class/class.module').then((m) => m.ClassPageModule),
          },
          {
            path: 'students',
            loadChildren: () =>
              import('./admin/students/students.module').then(
                (m) => m.StudentsPageModule
              ),
          },
          {
            path: 'programming',
            loadChildren: () =>
              import('./admin/programming/programming.module').then(
                (m) => m.ProgrammingPageModule
              ),
          },
          {
            path: 'profile',
            loadChildren: () =>
              import('./admin/profile/profile.module').then(
                (m) => m.ProfilePageModule
              ),
          },
        ],
      },
      {
        path: '', // Ruta vacía para usuarios normales
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule{};
