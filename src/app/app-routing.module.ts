import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactListComponent } from './contact-list/contact-list.component';

import { CalendarComponent } from './calendar/calendar.component';

import { RefreshComponent } from './refresh/refresh.component';

const routes: Routes = [
  {
    path: 'contacts/create',
    component: ContactAddComponent
  },
  {
    path: 'contacts/:id',
    component: ContactEditComponent
  },
  {
    path: 'contacts',
    component: ContactListComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'refresh',
    component: RefreshComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
