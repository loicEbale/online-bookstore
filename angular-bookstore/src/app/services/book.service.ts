import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../common/book.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl ="http://localhost:8088/api/v1/books";

  constructor(private httpClient: HttpClient) { }

  /**
   * Function to get books on the given URL
   */
  getBooks(categoryId: number): Observable<Book[]> {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${categoryId}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  } 
}

/**
 * Interface help us to unwrap the Book array from JSON response
 */
interface GetResponseBooks{
  _embedded: {
    books: Book[];
  }
}