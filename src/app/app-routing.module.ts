import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactListComponent } from './contact-list/contact-list.component';

import { CalendarComponent } from './calendar/calendar.component';

import { RefreshComponent } from './refresh/refresh.component';

import { LoginComponent } from './auth/login.component';

const routes: Routes = [
  {
    path: 'contacts/create',
    canActivate: [AuthGuard],
    component: ContactAddComponent
  },
  {
    path: 'contacts/:id',
    canActivate: [AuthGuard],
    component: ContactEditComponent
  },
  {
    path: 'contacts',
    canActivate: [AuthGuard],
    component: ContactListComponent
  },
  {
    path: 'calendar',
    canActivate: [AuthGuard],
    component: CalendarComponent
  },
  {
    path: 'refresh',
    component: RefreshComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
