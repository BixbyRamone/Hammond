import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { ValueComponent } from './value/value.component';
import { SigninComponent } from './signin/signin.component';
import { NavComponent } from './nav/nav.component';


@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      HomeComponent,
      SigninComponent,
      NavComponent
   ],
   imports: [
      BrowserModule,
      BsDropdownModule.forRoot(),
      HttpClientModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
