import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/models/book.type';
import { BookService } from 'src/services/book.service';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.scss']
})
export class DisplayBookComponent {
  public book !: Book;
  constructor(private bookService: BookService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    let index = this.route.snapshot.queryParamMap.get('index');
    this.bookService.getBook(index).subscribe(data => {
      this.book = data;
    });
  }
}
