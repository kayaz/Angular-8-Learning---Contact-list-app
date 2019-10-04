import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { RefreshComponent } from './refresh/refresh.component';
import { InvestmentsComponent } from './investments/investments.component';

import { NgxPaginationModule } from 'ngx-pagination';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './calendar/calendar.component';

import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './auth/login.component';
import {FilterPipe} from './_pipes/filer.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactAddComponent,
    ContactEditComponent,
    RefreshComponent,
    CalendarComponent,
    LoginComponent,
    InvestmentsComponent,
    FilterPipe
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    NgSelectModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FullCalendarModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost'],
        blacklistedRoutes: ['localhost/ngauth/login']
      }
    })
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
