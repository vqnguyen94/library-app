function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read;}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 255, 'not read yet');
console.log(book1.info());

// let myLibrary = [];

// function Book(){

// }

// function addBookToLibrary(){

// }