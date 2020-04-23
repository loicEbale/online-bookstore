import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book.model';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  private books: Book[];
  private currentCategoryId: number;
  constructor(private _bookService: BookService, 
              private _activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activeRoute.paramMap.subscribe(() => {
      this.listBooks();
    });
  }

  listBooks() {
    const hasCategoryId: boolean = this._activeRoute.snapshot.paramMap.has("id");
    
    if(hasCategoryId) {
      this.currentCategoryId = +this._activeRoute.snapshot.paramMap.get("id");
    } else {
      this.currentCategoryId = 1;
    }

    this._bookService.getBooks(this.currentCategoryId).subscribe(
      data => {
        this.books = data;
      }
    );
  }
}
