import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BookService } from 'src/services/book.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';

@NgModule({
  declarations: [
    AppComponent,
    BootstrapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [BookService,HttpClient],
  bootstrap: [BootstrapComponent]
})
export class AppModule { }