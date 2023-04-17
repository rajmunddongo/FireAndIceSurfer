import { Component, OnInit } from '@angular/core';
import { Book } from 'src/models/book.type';
import { BookService } from 'src/services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fireandice';
  public Books: Book[] = [];

  constructor(private bookService:BookService) {}

  ngOnInit(): void {
    this.bookService.getFirstTenBooks().subscribe(data=> this.Books=data)
  }
}
