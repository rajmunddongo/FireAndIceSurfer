import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { HouseComponentComponent } from './components/house-component/house-component.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'houses', component: HouseComponentComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
