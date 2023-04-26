import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router:Router ,private bookService:BookService, private houseService:HouseService) {}

  ngOnInit(): void {
    this.bookService.getFirstTenBooks().subscribe(data=> this.Books=data)
  }
  goToBook(name: string) {
    this.router.navigate(['/book'], { queryParams: { name: name } });
  }
}
