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



let library = [];

function Book(title,author,pages,read,coverURL){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.cover = coverURL;
}
Book.prototype.info = ()=>{
  let info = `${title} by ${author}, ${pages} pages,`;
  if (this.read) {
    return info + ' read';
  }
  return info + ' not read yet';
}

function displayNewBook(book) {
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
  backPages.textContent = `Title: ${book.pages}`;
  
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

  back.appendChild(backTitle);
  back.appendChild(backAuthor);
  back.appendChild(backPages);
  back.appendChild(backButtons);



  let shelf = document.querySelector('#shelf');
  let books = shelf.childNodes;

  bookContainer.dataset.index = books.length-1;
  shelf.insertBefore(bookContainer,books[0]);
}




function createBook(){
  let title = document.querySelector('#create-title').value;
  let author = document.querySelector('#create-author').value;
  let pages = document.querySelector('#create-pages').value;
  let cover = document.querySelector('#create-cover').value;
  if (cover == "") cover = "https://img.icons8.com/ios-filled/50/000000/open-book.png"
  let read = Boolean(document.querySelector('#create-read').checked);

  library.push(new Book(title,author,pages,read,cover));

}

function removeBook(e){
  //remove from library and remove from display
  //use dataset index
  
  let index = e.target.dataset.index;

}
/*function updateShelfIndexes(){
  let books = document.querySelector('#shelf').children;
  for(let i = 1; i < books.length; i++){
    books[i].dataset.index = Number(books[i].dataset.index) + 1; 
  }
}*/


function toggleForm(){
  let form = document.querySelector('#form-container');
  let height = form.style.height;
  form.style.height = height == '0px' || height == 0 ? '100vh' : '0px';

}
document.querySelector('#create').addEventListener('click',toggleForm);

document.querySelector("form").addEventListener('submit',(e)=>{
  //createBook();
  //displayNewBook(library[library.length-1]);
  //toggleForm();
  e.preventDefault();
});

document.querySelector("#sub").addEventListener('click',()=>{
  createBook();
  displayNewBook(library[library.length-1]);
  toggleForm();
});

