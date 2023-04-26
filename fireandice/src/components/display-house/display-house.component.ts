import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { House } from 'src/models/house.type';
import { BookService } from 'src/services/book.service';
import { HouseService } from 'src/services/house.service';

@Component({
  selector: 'app-display-house',
  templateUrl: './display-house.component.html',
  styleUrls: ['./display-house.component.scss']
})
export class DisplayHouseComponent {
  public house !: House;
  constructor(private houseService: HouseService, private bookService: BookService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    let index = this.route.snapshot.queryParamMap.get('index');
    this.houseService.getHouse(index).subscribe(data => {
      this.house = data;
    });
  }
}
