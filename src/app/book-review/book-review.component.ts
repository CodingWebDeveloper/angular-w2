import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbRatingConfig, NgbRatingModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Book } from './book.interface';

@Component({
  selector: 'app-book-review',
  standalone: true,
  imports: [NgbRatingModule, FormsModule, ReactiveFormsModule, CommonModule, NgbPaginationModule],
  templateUrl: './book-review.component.html',
  styleUrl: './book-review.component.scss',
  providers: [NgbRatingConfig]
})
export class BookReviewComponent implements OnInit {
  constructor (config: NgbRatingConfig) {
    config.max= 5;
  }

  books : Book[] = [
    {
      title: "To Kill a Mockingbird",
      description: "A novel set in the American South during the 1930s, dealing with the issues of racial injustice and moral growth.",
      author: "Harper Lee",
      rating: 0,
    },
    {
      title: "1984",
      description: "A dystopian novel set in a totalitarian society, exploring themes of surveillance, government oppression, and individualism.",
      author: "George Orwell",
      rating: 0,
    },
    {
      title: "The Great Gatsby",
      description: "A classic novel portraying the glamorous and decadent lifestyle of wealthy Long Island society during the Roaring Twenties.",
      author: "F. Scott Fitzgerald",
      rating: 0,
    },
    {
      title: "Pride and Prejudice",
      description: "A romantic novel set in early 19th-century England, focusing on the themes of love, marriage, and social status.",
      author: "Jane Austen",
      rating: 0,
    },
    {
      title: "The Catcher in the Rye",
      description: "A coming-of-age novel following the experiences of Holden Caulfield, a disenchanted teenager navigating the challenges of adolescence.",
      author: "J.D. Salinger",
      rating: 0,
    },
    {
      title: "The Hobbit",
      description: "A fantasy novel about the journey of Bilbo Baggins, a hobbit who embarks on an adventure to reclaim treasure guarded by a dragon.",
      author: "J.R.R. Tolkien",
      rating: 0,
    },
    {
      title: "The Lord of the Rings",
      description: "An epic high-fantasy trilogy following the quest to destroy the One Ring, set in the fictional world of Middle-earth.",
      author: "J.R.R. Tolkien",
      rating: 0,
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      description: "The first book in the Harry Potter series, which follows the adventures of a young wizard, Harry Potter, and his friends at Hogwarts School of Witchcraft and Wizardry.",
      author: "J.K. Rowling",
      rating: 0,
    },
    {
      title: "The Da Vinci Code",
      description: "A mystery thriller novel that follows symbologist Robert Langdon and cryptologist Sophie Neveu as they investigate a murder in Paris.",
      author: "Dan Brown",
      rating: 0,
    },
    {
      title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
      description: "The first book in The Chronicles of Narnia series, which follows the adventures of four children who discover a magical world through a wardrobe.",
      author: "C.S. Lewis",
      rating: 0,
    }
  ];

  page= 1;
  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
  });
  rating = new FormControl<number | null>(null, [Validators.min(1), Validators.required]);
  finished = false;

  averageRating() {
    return (this.books.slice(0, this.page).reduce((acc, curr) => {return acc + curr.rating}, 0) / this.page).toFixed(2);
  }

  ngOnInit() {
    this.setBookFormValues();
  }

  getBook() : Book {
    return this.books.at(this.page - 1) ?? {title: '', description: '', author: '', rating: 0,};
  }

  setBookFormValues() {
    const currentBook = this.getBook();
      this.bookForm.patchValue({
        title: this.getBook().title,
        description: this.getBook().description,
        author: this.getBook().author
      });
      this.rating.patchValue(this.getBook().rating);
  }

  updateBook() {
    let book = this.books[this.page - 1];
    book.title = this.bookForm.value?.title ?? '';
    book.description = this.bookForm.value?.description ?? '';
    book.author = this.bookForm.value?.author ?? '';
    this.page++;
    this.setBookFormValues();
  }

  resetCollection() {
    this.page = 1;
    this.books = this.books.map((b) => {
      return {
        ...b,
        rating: 0,
      };
    })
    this.setBookFormValues();
  }

  finish(){
    this.finished = true;
  }

  rate() {
    this.books[this.page - 1].rating = this.rating.value ?? 0;
    this.rating.reset(null);
  }
}
