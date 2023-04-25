import { Component, OnInit } from '@angular/core';
import { Book } from 'src/models/book.type';
import { House } from 'src/models/house.type';
import { BookService } from 'src/services/book.service';
import { HouseService } from 'src/services/house.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fireandice';
  public Books: Book[] = [];
  public Houses: House[] = [];

  public housePage = 1;

  constructor(private bookService:BookService, private houseService:HouseService) {}

  ngOnInit(): void {
    this.bookService.getFirstTenBooks().subscribe(data=> this.Books=data)
    this.houseService.getHouses("").subscribe(data=> {
      this.Houses=data
      this.Houses.forEach(house => {
        this.houseService.getOverLord(house.overlord).subscribe(data=> house.overlordName=data.name)
      });})
  }

  nextHousePage() {
    this.housePage++;
    this.houseService.getHouses("?page="+this.housePage+"&pageSize=10").subscribe(data=> {
      this.Houses=data
    })
  }
  previousHousePage() {
    if(this.housePage!=0)
    this.housePage--;
    this.houseService.getHouses("?page="+this.housePage+"&pageSize=10").subscribe(data=> {
      this.Houses=data
    }) 
  }
}
