import { Component } from '@angular/core';
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

  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
    this.houseService.getHouses("").subscribe(data => {
      this.Houses = data
      this.Houses.forEach(house => {
        this.houseService.getOverLord(house.overlord).subscribe(data => house.overlordName = data.name)
      });
    })
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
}
