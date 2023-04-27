/**
 * Root component of fire and api application.
 * We display the books on this page and if the user clicks on the
 * book we navigate to the book display page using the router.
 */
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

  /**
   * The title of the page.
   */
  title = 'FireAndIceApiViewer';

  /**
   * Array of books storing the that are being shown.
   */
  public Books: Book[] = [];

  /**
   * Constructor.
   * @param router - The service for routing
   * @param bookService - The service for obtaining books.
   * @param houseService - The service for obtaining houses.
   */
  constructor(private router: Router, private bookService: BookService, private houseService: HouseService) {}

  /**
   * Obtains the first 10 books from the list of books using the api.
   */
  ngOnInit(): void {
    this.bookService.getFirstTenBooks().subscribe(data => this.Books = data);
  }

  /**
   * Navigates to the book display site of the book with the given name.
   * @param name - The name of the book where we navigate to.
   */
  goToBook(name: string): void {
    this.router.navigate(['/book'], { queryParams: { name: name } });
  }
}
