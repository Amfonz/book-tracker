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

function Book(title,author,pages,read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.info = ()=>{
  let info = `${title} by ${author}, ${pages} pages,`;
  if (this.read) {
    return info + ' read';
  }
  return info + ' not read yet';
}