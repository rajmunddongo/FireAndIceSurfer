import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { BookService } from 'src/services/book.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { BootstrapComponent } from './components/bootstrap/bootstrap.component';
import { HouseComponentComponent } from './components/house-component/house-component.component';
import { CharactersComponent } from './components/characters/characters.component';
import { DisplayCharacterComponent } from './components/display-character/display-character.component';
import { RouterModule } from '@angular/router';
import { DisplayHouseComponent } from './components/display-house/display-house.component';
import { DisplayBookComponent } from './components/display-book/display-book.component';


@NgModule({
  declarations: [
    AppComponent,
    BootstrapComponent,
    HouseComponentComponent,
    CharactersComponent,
    DisplayCharacterComponent,
    DisplayHouseComponent,
    DisplayBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [BookService,HttpClient],
  bootstrap: [BootstrapComponent]
})
export class AppModule { }
