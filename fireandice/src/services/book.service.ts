import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Book } from "src/models/book.type";
import { Observable } from "rxjs";
import { HttpHandler } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  getFirstTenBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('https://www.anapioficeandfire.com/api/books?page=1&pageSize=100');
  }
  getBook(id: string | null): Observable<Book> {
    return this.http.get<Book>('https://www.anapioficeandfire.com/api/books/' + id);
  }
  getBookFromString(id: string): Observable<Book> {
    return this.http.get<Book>(id);
  }
}