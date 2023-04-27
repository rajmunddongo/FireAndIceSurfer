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
  /**
   * Obtain first 10 books
   * @returns 10 books
   */
  getFirstTenBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('https://www.anapioficeandfire.com/api/books?page=1&pageSize=100');
  }
  /**
   * Obtain a book with the given name
   * @param name name of the book
   * @returns book
   */
  getBook(name: string | null): Observable<Book[]> {
    return this.http.get<Book[]>('https://www.anapioficeandfire.com/api/books?name=' + name);
  }
  /**
   * Obtain a book from the given url
   * @param id URL where to obtain the book from
   * @returns book
   */
  getBookFromString(id: string): Observable<Book> {
    return this.http.get<Book>(id);
  }
}