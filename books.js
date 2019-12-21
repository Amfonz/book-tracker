function Book(title,author,pages,read,coverURL,index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.cover = coverURL;
  this.container = document.createElement('div');
  this.collectionIndex = index;
}
Book.prototype.info = function() {
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

Library.prototype.renderBook = function(book,update = false) {
  if(update) {
    //clear old nodes
    let nodes = book.container.children.length;
    for(let i = nodes - 1; i >= 0; i--){
      book.container.removeChild(book.container.children[i]);
    }
  }else { 
    book.container.classList.add('book-container');

  }
  //build book
  let flipContainer = document.createElement('div');
  flipContainer.classList.add('flip-inner');

  book.container.appendChild(flipContainer);

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

  let updateButton = document.createElement('button');
  updateButton.classList.add('update');
  let removeButton = document.createElement('button');
  removeButton.classList.add('remove');
  let readButton = document.createElement('button');
  readButton.classList.add('read');
  backButtons.appendChild(updateButton);
  backButtons.appendChild(removeButton);
  backButtons.appendChild(readButton);

  let editTool = document.createElement('span');
  editTool.textContent = "Edit Book";
  editTool.classList.add('tooltip');
  editTool.id = 'tool-edit';

  let removeTool = document.createElement('span');
  removeTool.textContent = "Remove Book";
  removeTool.classList.add('tooltip');
  removeTool.id = 'tool-remove';
  
  let readTool = document.createElement('span');
  readTool.textContent = "Change Read Status";
  readTool.classList.add('tooltip');
  readTool.id = 'tool-read';

  backButtons.appendChild(editTool);
  backButtons.appendChild(removeTool);
  backButtons.appendChild(readTool);

  if (book.read) {
    readCircle.style.opacity = 1;
    readButton.style.backgroundColor = 'hsl(120,60%,46%)';
  }

  back.appendChild(backTitle);
  back.appendChild(backAuthor);
  back.appendChild(backPages);
  back.appendChild(backButtons);

  if(!update) {
    book.container.dataset.collectionIndex = book.collectionIndex;
    let shelfPosition = getShelfPosition(book.collectionIndex);
    this.shelf.insertBefore(book.container,this.shelf.children[shelfPosition]);
  }
}

Library.prototype.addBook = function() {
  let title = document.querySelector('#create-title').value;
  let author = document.querySelector('#create-author').value;
  let pages = document.querySelector('#create-pages').value;
  let cover = document.querySelector('#create-cover').value;
  if (cover == "") cover = "https://img.icons8.com/ios-filled/50/000000/open-book.png"
  let read = Boolean(document.querySelector('#create-read').checked);
  let newBook = 
    new Book(title,author,pages,read,cover,this.collection.length);
  thisLibrary.collection.push(newBook);
  return newBook;
}

Library.prototype.removeBook = function(bookContainer) {
  let index = Number(bookContainer.dataset.collectionIndex);
  this.updateContainerData(index);
  this.collection = this.collection.slice(0,index).concat(this.collection.slice(index+1));
  this.shelf.removeChild(bookContainer);
}


Library.prototype.toggleReadBookDisplay = function(book) {
  let backButton = book.container.querySelector(".read");
  let frontCheckmark = book.container.querySelector('.read-circle');

  if (book.read) {
    backButton.style.backgroundColor = 'hsl(120,60%,46%)';
    frontCheckmark.style.opacity = 1;
  }else {
    backButton.style.backgroundColor = 'white';
    frontCheckmark.style.opacity = 0;
  }
}

Library.prototype.updateContainerData = function(startingIndex) {
  startingIndex++;
  for (let i = startingIndex; i < this.collection.length; i++) {
    this.collection[i].collectionIndex--;
    this.collection[i].container.dataset.collectionIndex = this.collection[i].collectionIndex;
  }
}

Library.prototype.updateBook = function() {
  let bookIndex = Number(document.querySelector('#update-form p').textContent);
  let book = thisLibrary.collection[bookIndex];

  book.title = document.querySelector('#update-title').value;
  book.author = document.querySelector('#update-author').value;
  book.pages = document.querySelector('#update-pages').value;
  book.cover = document.querySelector('#update-cover').value;
  if (book.cover == "") book.cover = "https://img.icons8.com/ios-filled/50/000000/open-book.png"
  book.read = Boolean(document.querySelector('#update-read').checked);
  return book;
}

function getShelfPosition(collectionIndex) {
  return thisLibrary.collection.length - collectionIndex - 1;
}

function getBookNode(button) {
  let node = button;
  do {
    node = node.parentNode;
  }while(!node.classList.contains('book-container'));
  return node;
}

function toggleForm(form) {
  let formContainer = document.querySelector(`#${form}-container`);
  formContainer.style.top = window.pageYOffset + 'px';
  let height = formContainer.style.height;
  formContainer.style.height = height == '0px' || height == 0 ? '100vh' : '0px';
}

function populateUpdateForm(book) {
  document.querySelector('#update-title').value = book.title;
  document.querySelector('#update-author').value = book.author;
  document.querySelector('#update-pages').value = book.pages;
  document.querySelector('#update-cover').value = book.cover;
  document.querySelector('#update-read').checked = book.read;
  document.querySelector('#update-form p').textContent = book.container.dataset.collectionIndex;
}

document.querySelector('#create-book').addEventListener('click',()=>{toggleForm('create')});

document.querySelector("#create-form").addEventListener('submit',(e) => {
  let book = thisLibrary.addBook();
  thisLibrary.renderBook(book);
  toggleForm('create');
  e.preventDefault();
});

document.querySelector("#update-form").addEventListener('submit',(e) => {
  let book = thisLibrary.updateBook();
  thisLibrary.renderBook(book,true);
  toggleForm('update');
  e.preventDefault();
});

document.querySelector('#shelf').addEventListener('click',(e)=>{
  if (e.target.classList.contains('update')) {
    let bookContainer = getBookNode(e.target);
    let book = thisLibrary.collection[Number(bookContainer.dataset.collectionIndex)];
    toggleForm('update');
    populateUpdateForm(book);
  } else if (e.target.classList.contains('remove')) {
    let bookContainer = getBookNode(e.target);
    thisLibrary.removeBook(bookContainer);

  } else if (e.target.classList.contains('read')){
    //do read stuff
    let bookContainer = getBookNode(e.target);
    let book = thisLibrary.collection[Number(bookContainer.dataset.collectionIndex)];
    book.toggleRead();
    thisLibrary.toggleReadBookDisplay(book);

  }else{
     return;
  }
});

document.querySelector('#shelf').addEventListener('mouseover',(e)=>{
  if (e.target.tagName == "BUTTON") {    
    e.target.style.backgroundColor = "hsl(120,60%,46%)";    
    if(e.target.classList.contains('update')){
      e.target.parentNode.querySelector('#tool-edit').style.visibility = 'visible';
    }else if (e.target.classList.contains('remove')) {
      e.target.parentNode.querySelector('#tool-remove').style.visibility = 'visible';
    }else {
      e.target.parentNode.querySelector('#tool-read').style.visibility = 'visible';
    }
  }else{
     return;
  }
});

document.querySelector('#shelf').addEventListener('mouseout',(e)=>{
  if (e.target.tagName == "BUTTON") {
    if(e.target.classList.contains('update')){
      e.target.parentNode.querySelector('#tool-edit').style.visibility = 'hidden';
      e.target.style.backgroundColor = "white";  

    }else if (e.target.classList.contains('remove')) {
      e.target.parentNode.querySelector('#tool-remove').style.visibility = 'hidden';
      e.target.style.backgroundColor = "white";  

    }else {
      let container = getBookNode(e.target);
      e.target.parentNode.querySelector('#tool-read').style.visibility = 'hidden';
      if(thisLibrary.collection[container.dataset.collectionIndex].read){
        return;
      }
      e.target.style.backgroundColor = "white";  
    }
  }else {
    return;
  }
});

function storageAvailable() {
  try{
    window.localStorage.setItem('x','x');
    window.localStorage.removeItem('x');
    return true;
  }catch (exception) {
    return false;
  }
}

function loadLibrary() {
  let keys = Object.keys(window.localStorage);
  for(let i = keys.length - 1; i >= 0; i--) {
    let bookFields = window.localStorage.getItem(keys[i]).split(',');
    let title = bookFields[0];
    let author = bookFields[1];
    let pages = Number(bookFields[2]);
    let read = Boolean(bookFields[3]);
    let cover = bookFields[4];
    let collectionIndex = Number(bookFields[5]);
    let book = new Book(title,author,pages,read,cover,collectionIndex);
    thisLibrary.collection.push(book);
    thisLibrary.renderBook(book);
  }
  return;
}
function saveLibrary() {
  window.localStorage.clear();
  let collection = thisLibrary.collection;
  collection.forEach(book => {
    /*
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
      this.cover = coverURL;
      this.container = document.createElement('div');
      this.collectionIndex = index;
    */
    if (!book.read) book.read = '';
    let data = `${book.title},${book.author},${book.pages},${book.read},${book.cover},${book.collectionIndex}`;
    window.localStorage.setItem(`${book.collectionIndex}`,data);
  });
}

window.addEventListener('unload',saveLibrary);
window.addEventListener('scroll',()=>{
  setTimeout(()=>{
    let updateFormContainer = document.querySelector(`#update-container`);
    let createFormContainer = document.querySelector(`#create-container`);

    createFormContainer.style.top = window.pageYOffset + 'px';
    updateFormContainer.style.top = window.pageYOffset + 'px';
  },200);
});
function initialize() {
  if(storageAvailable()) {
      loadLibrary();
  }else {
    return;
  }
}
var thisLibrary = new Library();
initialize();


/*
todo 
storage (sort out unloading events)
styling
  - shelf
  - buttons
*/