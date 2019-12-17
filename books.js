/*
  Required functionlity:
    create new book
      - display form
      - take form info create new book and add it to shelf
          - at front
    delete book
      - remove book from display and library

    read
      - toggle read status on book object
      - affects the button on back

    check mark on cover of read books
*/




function Book(title,author,pages,read,coverURL){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.cover = coverURL;
}
Book.prototype.info = function(){
  let info = `${title} by ${author}, ${pages} pages,`;
  if (this.read) {
    return info + ' read';
  }
  return info + ' not read yet';
};
Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function Library() {
  this.shelf = document.querySelector('#shelf');
  this.collection = [];
}

Library.prototype.displayNewBook = function(book){
  let bookContainer = document.createElement('div');
  bookContainer.classList.add('book-container');

  let flipContainer = document.createElement('div');
  flipContainer.classList.add('flip-inner');

  bookContainer.appendChild(flipContainer);

  let front = document.createElement('div');
  front.classList.add('front');
  
  flipContainer.appendChild(front);


  let cover = document.createElement('img');
  cover.classList.add('cover');
  cover.src = book.cover;

  front.appendChild(cover);

  let readCircle = document.createElement('div');
  readCircle.classList.add('read-circle');
  front.appendChild(readCircle);


  
  let whiteBar = document.createElement('div');
  whiteBar.classList.add('white-bar');
  let whiteSpan1 = document.createElement('span');
  whiteSpan1.textContent = "Your";
  let whiteSpan2 = document.createElement('span');
  whiteSpan2.textContent = "Library";
  let whiteBarImage = document.createElement('img');
  whiteBarImage.src = "https://img.icons8.com/ios-filled/50/000000/open-book.png";
  
  whiteBar.appendChild(whiteSpan1);
  whiteBar.appendChild(whiteBarImage);
  whiteBar.appendChild(whiteSpan2);
  front.appendChild(whiteBar);
  let blackBox = document.createElement('div');
  blackBox.classList.add('black-box') ;
  let authorFront = document.createElement('p');
  authorFront.classList.add('author-front');
  authorFront.textContent = book.author;
  let titleFront = document.createElement('p');
  titleFront.classList.add('title-front');
  titleFront.textContent = book.title; 

  blackBox.appendChild(authorFront);
  blackBox.appendChild(titleFront);
  front.appendChild(blackBox);

  let back = document.createElement('div');
  back.classList.add('back');

  flipContainer.appendChild(back);

  let backTitle = document.createElement('p');
  backTitle.textContent = `Title: ${book.title}`;
  let backAuthor = document.createElement('p');
  backAuthor.textContent = `Author: ${book.author}`;
  let backPages = document.createElement('p');
  backPages.textContent = `Pages: ${book.pages}`;
  
  let backButtons = document.createElement('div');
  backButtons.classList.add('back-button-container');

  let update = document.createElement('button');
  update.classList.add('update');
  let remove = document.createElement('button');
  remove.classList.add('remove');
  let read = document.createElement('button');
  read.classList.add('read');
  backButtons.appendChild(update);
  backButtons.appendChild(remove);
  backButtons.appendChild(read);

  if (book.read) {
    readCircle.style.opacity = 1;
    read.style.backgroundColor = 'green';
  }

  

  back.appendChild(backTitle);
  back.appendChild(backAuthor);
  back.appendChild(backPages);
  back.appendChild(backButtons);

  let books = this.shelf.children;

  bookContainer.dataset.index = books.length;
  this.shelf.insertBefore(bookContainer,books[0]);
  
}

Library.prototype.addBook = function() {
  let title = document.querySelector('#create-title').value;
  let author = document.querySelector('#create-author').value;
  let pages = document.querySelector('#create-pages').value;
  let cover = document.querySelector('#create-cover').value;
  if (cover == "") cover = "https://img.icons8.com/ios-filled/50/000000/open-book.png"
  let read = Boolean(document.querySelector('#create-read').checked);

  this.collection.push(new Book(title,author,pages,read,cover));

}





function getBookNode(button){
  let node = button;
  do {
    node = node.parentNode;
  }while(!node.classList.contains('book-container'));
  return node;
}
/*
Library.prototype.updateBook = function(e) {
  //toggle form
  //change form headline
  //make all the fields contain book data
  //on submit update book
  //and display the book
  let book = this.collection[Number(getBookNode(e.target).dataset.index)];
  book.title = document.querySelector('#create-title').value;
  book.author = document.querySelector('#create-author').value;
  book.pages = document.querySelector('#create-pages').value;
  book.cover = document.querySelector('#create-cover').value;
  if (book.cover == "") book.cover = "https://img.icons8.com/ios-filled/50/000000/open-book.png"
  book.read = Boolean(document.querySelector('#create-read').checked);
}

function renderUpdateForm(e) {
  let book = this.collection[Number(getBookNode(e.target).dataset.index)];
  let form = document.querySelector('form');
  form.firstChild.textContent = "Update Book";
  document.querySelector('#create-title').value = book.title;
  document.querySelector('#create-author').value = book.author;
  document.querySelector('#create-pages').value = book.pages;
  document.querySelector('#create-cover').value = book.cover;
  //document.querySelector('#create-read').value = book.read;
}
*/

Library.prototype.removeBook = function(bookContainer){
  //remove from library and remove from display
  //use dataset index
  //delete from display and remove from array
  let index = Number(bookContainer.dataset.index);
  this.collection = this.collection.slice(0,index).concat(this.collection.slice(index+1));
  this.updateIndicies(index);
  this.shelf.removeChild(bookContainer);
}

Library.prototype.toggleReadBookDisplay = function(bookContainer,book){
  let backButton = bookContainer.querySelector(".read");
  let frontCheckmark = bookContainer.querySelector('.read-circle');

  if (book.read) {
    backButton.style.backgroundColor = 'green';
    frontCheckmark.style.opacity = 1;
  }else {
    backButton.style.backgroundColor = 'white';
    frontCheckmark.style.opacity = 0;
  }
}

Library.prototype.updateIndicies = function(startingIndex) {
  let books = this.shelf.children;
  for(let i = startingIndex+1; i < books.length; i++) {
    books[i].dataset.index = Number(books[i].dataset.index) - 1;
  }
}


function toggleForm(){
  let form = document.querySelector('#form-container');
  let height = form.style.height;
  form.style.height = height == '0px' || height == 0 ? '100vh' : '0px';

}
document.querySelector('#create').addEventListener('click',toggleForm);

document.querySelector("form").addEventListener('submit',(e) => {
  thisLibrary.addBook();
  thisLibrary.displayNewBook(thisLibrary.collection[thisLibrary.collection.length-1]);
  toggleForm();
  e.preventDefault();
});

document.querySelector('#shelf').addEventListener('click',(e)=>{
  if (e.target.classList.contains('update')) {
    //do update stuff
  } else if (e.target.classList.contains('remove')) {
    //do remove stuff
    let bookContainer = getBookNode(e.target);
    thisLibrary.removeBook(bookContainer);

  } else if ((e.target.classList.contains('read'))){
    //do read stuff
    let bookContainer = getBookNode(e.target);
    let book = thisLibrary.collection[Number(bookContainer.dataset.index)];
    book.toggleRead();
    thisLibrary.toggleReadBookDisplay(bookContainer,book);

  }else{
     return;
  }
});

document.querySelector('#shelf').addEventListener('mouseover',(e)=>{
  if (e.target.tagName == "BUTTON") {    
    e.target.style.backgroundColor = "green";    

  }else{
     return;
  }
});

document.querySelector('#shelf').addEventListener('mouseout',(e)=>{
  if (e.target.tagName == "BUTTON" &&  e.target.classList.contains('read')) {
      let bookContainer = getBookNode(e.target);
      if (thisLibrary.collection[Number(bookContainer.dataset.index)].read) {
        return;
      }else {
        e.target.style.backgroundColor = "white";  
      }
    }
  else if (e.target.tagName == "BUTTON") {
    e.target.style.backgroundColor = "white";  
  }else {
    return;
  }
});



var thisLibrary = new Library();