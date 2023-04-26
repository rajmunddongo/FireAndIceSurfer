import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { HouseComponentComponent } from './components/house-component/house-component.component';
import { CharactersComponent } from './components/characters/characters.component';
import { DisplayCharacterComponent } from './components/display-character/display-character.component';
import { DisplayHouseComponent } from './components/display-house/display-house.component';
import { DisplayBookComponent } from './components/display-book/display-book.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'houses', component: HouseComponentComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'character', component: DisplayCharacterComponent },
  { path: 'house', component: DisplayHouseComponent },
  { path: 'book', component: DisplayBookComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
