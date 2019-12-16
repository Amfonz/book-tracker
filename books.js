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
  cover.src = book.cover;

  front.appendChild(cover);
  
  let whiteBar = document.createElement('white-bar');
  let whiteSpan1 = document.createElement('span');
  whiteSpan1.textContent = "Your";
  let whiteSpan2 = document.createElement('span');
  whiteSpan1.textContent = "Library";
  let whiteBarImage = document.createElement('img');
  whiteBarImage.src = "https://img.icons8.com/ios-filled/50/000000/open-book.png";
  
  whiteBar.appendChild(whiteSpan1);
  whiteBar.appendChild(whiteSpan2);
  whiteBar.appendChild(whiteBarImage);
  front.appendChild(whiteBar);

  let blackBox = document.createElement('div');
  blackBox.classList.add('black-box') ;
  let authorFront = document.createElement('p');
  authorFront.textContent = book.author;
  let titleFront = document.createElement('p');
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
  let update = document.createElement('button');
  update.value = 'Update';
  let remove = document.createElement('button');
  remove.value = 'Remove';
  let read = document.createElement('button');
  read.value = 'read';

  back.appendChild(backTitle);
  back.appendChild(backAuthor);
  back.appendChild(backPages);
  back.appendChild(update);
  back.appendChild(remove);
  back.appendChild(read);


  let shelf = document.querySelector('#shelf');
  shelf.appendChild(bookContainer);
}


document.querySelector('#create').addEventListener('click',()=>{
  let form = document.querySelector('#form-container');
  form.style.height = form.style.height == 0 ? '100vh' : 0;
});

function createBook(){
  let form = document.querySelector('#form-container');
  form.style.height = 0;
}