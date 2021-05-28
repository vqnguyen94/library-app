//Possible additional features:
// Add progress bar for pages completed
// Add picture of book
// Error checking for form inputs, limit long titles, authors, etc 
// Multiple "pages" so that no scroll is needed to display a larger amount of books


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function toggleStatus(book) {
  if(book.read == "Read"){
    book.read = "Unread";
  }
  else{
    book.read = "Read";
  }
  //Sync with localstorage
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function findBookAndToggleStatus(title){
  for (let i = 0; i < myLibrary.length; i++){
    if(myLibrary[i].title == title){
      toggleStatus(myLibrary[i]);
      break;
    }
  }
}

function toggleStatusButton(){
  this.classList.toggle('status-unread');
  this.classList.toggle('status-read');
  if(this.textContent == "Unread"){
    this.textContent = "Read";
  }
  else{
    this.textContent = "Unread";
  }
  //Uses book title of card associated with the button pressed to find the book in the library
  findBookAndToggleStatus(this.parentElement.querySelector('h2').textContent);
}

//Creates a card that is displayed to represent a book in the library
function createBookCard(){
  const div = document.createElement('div');
  const remove = document.createElement("SPAN");
  const bookTitle = document.createElement('h2');
  const bookAuthor = document.createElement('h3');
  const bookPages = document.createElement('p');
  const status = document.createElement('div');
  let readStatus = checkReadStatus();
  
  //"X" on each card to remove book
  remove.innerHTML = "&times;";
  remove.addEventListener("click", removeBook);
  remove.classList.toggle('close'); 

  bookTitle.textContent = title.value;
  bookAuthor.textContent = author.value;
  bookPages.textContent = pages.value + " pages";
  status.textContent = readStatus;

  status.addEventListener("click", toggleStatusButton);

  if(readStatus == "Unread"){
    status.classList.toggle('status-unread');
  }
  else{
    status.classList.toggle('status-read');
  }

  div.appendChild(remove);
  div.appendChild(bookTitle);
  div.appendChild(bookAuthor);
  div.appendChild(bookPages);
  div.appendChild(status);
  div.classList.toggle('book');

  library.appendChild(div);
}

function addBookToLibrary(e){
  //Prevents page from refreshing after submitting form
  e.preventDefault();
  let readStatus = checkReadStatus();
  let book = new Book(title.value, author.value, pages.value, readStatus);
  myLibrary.push(book);
  localStorage.setItem('library', JSON.stringify(myLibrary));
  createBookCard();
  form.reset();
  modal.style.display = "none";
}

function checkReadStatus(){
  if(document.getElementById('unread').checked){
      return "Unread";
  }
  else{
      return "Read";
  }
}

function removeBook(){
  //Remove card
  library.removeChild(this.parentElement);

  //Remove from library array by finding matching title
  for (let i = 0; i < myLibrary.length; i++){
    if(myLibrary[i].title == this.parentElement.querySelector('h2').textContent){
      myLibrary.splice(i, 1); 
      break;
    }
  }
  //Sync with localstorage
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

function refreshLibraryDisplay(){
  removeAllBookCards();
  createBookCardsFromLibrary();
}

function removeAllBookCards() {
  while (library.firstChild) {
      library.removeChild(library.firstChild);
  }
}

//Make a card for each book in the library
function createBookCardsFromLibrary(){
  for(let i = 0; i < myLibrary.length; i++){
    getBookValues(myLibrary[i]);
    createBookCard();
  }
  form.reset();
}

function getBookValues(book){
  title.value = book.title;
  author.value = book.author;
  pages.value = book.pages;
  if(book.read == "Unread"){
    document.getElementById('unread').checked = true;
  }
  else{
    document.getElementById('read').checked = true;
  }
}

function checkForLocalStorage(){
  if (typeof(Storage) !== "undefined") {
    //If data previously existed, then populate the library
    if (localStorage.library) {
      myLibrary = JSON.parse(localStorage.getItem('library'));
      refreshLibraryDisplay();
    }
    //Set for the first time 
    else {
      localStorage.setItem('library', JSON.stringify(myLibrary));
    }
  } 
  else {
    console.log("Sorry, your browser does not support web storage...");
  }
}


//--------------------------MAIN ----------------------------------------------------------

const form = document.querySelector("form");
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const confirmButton = document.querySelector('#confirm');
const cancelButton = document.querySelector('#cancel');
const library = document.querySelector('#library');
const modal = document.getElementById("myModal");
const addBookButton = document.getElementById("add");

let myLibrary = [];

form.addEventListener("submit", addBookToLibrary);

cancelButton.onclick = function() {
  form.reset();
  modal.style.display = "none";
}

// When the user clicks on the add book button, open the modal
addBookButton.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

checkForLocalStorage();