import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Book } from 'src/models/book.type';
import { House } from 'src/models/house.type';
import { BookService } from 'src/services/book.service';
import { HouseService } from 'src/services/house.service';

@Component({
  selector: 'app-house-component',
  templateUrl: './house-component.component.html',
  styleUrls: ['./house-component.component.scss']
})
export class HouseComponentComponent {
  public Houses: House[] = [];

  public housePage = 1;

  constructor(private houseService: HouseService,private router:Router) { }

  ngOnInit(): void {
    this.houseService.getHouses("").subscribe(data => {
      this.Houses = data;
      const overlordObservables = this.Houses.map(house => this.houseService.getOverLord(house.overlord));
      forkJoin(overlordObservables).subscribe(overlords => {
        overlords.forEach((overlord, index) => {
          this.Houses[index].overlordName = overlord.name;
        });
      });
    });
  }
  
  
  nextHousePage() {
    this.housePage++;
    this.houseService.getHouses("?page=" + this.housePage + "&pageSize=10").subscribe(data => {
      this.Houses = data
    })
  }
  previousHousePage() {
    if (this.housePage != 0)
      this.housePage--;
    this.houseService.getHouses("?page=" + this.housePage + "&pageSize=10").subscribe(data => {
      this.Houses = data
    })
  }
  goToHouse(id:number) {
    const houseIndex = (this.housePage - 1) * 10 + id;
    this.router.navigate(['/house'], { queryParams: { index: houseIndex } });
  }
}
