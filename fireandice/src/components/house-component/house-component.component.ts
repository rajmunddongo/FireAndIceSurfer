/**
 * This component is for displaying a set of houses.
 */
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

  /**
   * The houses we display.
   */
  public Houses: House[] = [];

  /**
   * The number of the house page.
   */
  public housePage = 1;

  /**
   * Constructor
   * @param {HouseService} houseService - Service to obtain houses.
   * @param {Router} router - Router for routing.
   */
  constructor(private houseService: HouseService, private router: Router) { }

  /**
   * Load houses and their overlords.
   */
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

  /**
   * Load the next page of houses.
   */
  nextHousePage() {
    this.housePage++;
    this.houseService.getHouses("?page=" + this.housePage + "&pageSize=10").subscribe(data => {
      this.Houses = data;
    });
  }

  /**
   * Load the previous page of houses.
   */
  previousHousePage() {
    if (this.housePage != 0) {
      this.housePage--;
    }
    this.houseService.getHouses("?page=" + this.housePage + "&pageSize=10").subscribe(data => {
      this.Houses = data;
    });
  }

  /**
   * Redirect to the house with the given name.
   * @param {string} name - The name of the house.
   */
  goToHouse(name: string) {
    this.router.navigate(['/house'], { queryParams: { name: name } });
  }
}
