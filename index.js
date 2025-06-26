const myLibrary = [
    {
        id:1,
        title: "The Alchemist",
        author:"Paulo Coelho",
        isRead: true

    },
    {
        id:2,
        title: "The Power of Now",
        author: "Eckhart Tolle",
        isRead: false
    },
    {
        id:3,
        title: "Atomic Habits",
        author: "James Clear",
        isRead: true
    },
    {   
        id:4,    
        title: "The Subtle Art of Not Giving a F*ck",
        author: "Mark Manson",
        isRead: false
    },
    {
        id:5,
        title: "Educated",
        author: "Tara Westover",
        isRead: true
    },
    {        
        id:6,
        title: "Becoming",
        author: "Michelle Obama",
        isRead: false
    }  

];

function Book(title, author, isRead){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, isRead) {
    const book = new Book(title, author, isRead);
    myLibrary.push(book);
}

function deleteBookFromLibrary(id){
    const index = myLibrary.findIndex(book => book.id == id);
    if (index > -1) {
        myLibrary.splice(index, 1);
    }
}

const container = document.getElementById('container');

function createElement(tag, className, textContent = '') {
    const element = document.createElement(tag);
    element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

function createBookCard(book) {
    const bookCard = createElement('div', 'bookCard');
    bookCard.setAttribute('data-id', book.id);
    
    const bookTitle = createElement('h1', 'bookTitle', book.title);
    const bookAuthor = createElement('h4', 'bookAuthor', book.author);
    const readStatus = createElement('input', 'readStatus');
    readStatus.type = 'checkbox';
    readStatus.className = 'readStatus';
    readStatus.checked = book.isRead;
    readStatus.addEventListener('change', () => {
        book.toggleReadStatus();
        displayAllBooks(); // Re-render the entire list
    });
    bookCard.append(readStatus);
    const isRead = createElement('p', 'isRead', readStatus.checked ? "Already Read" : "Not been read yet");
    const deleteBookBtn = createElement('button', 'deleteBook', 'Delete');
    
    deleteBookBtn.addEventListener('click', () => {
        deleteBook(book.id);
    });

    bookCard.append(bookTitle, bookAuthor, isRead, deleteBookBtn, readStatus);
    return bookCard;
}

function displayAllBooks() {
    container.innerHTML = '';
    const bookCards = myLibrary.map(book => createBookCard(book));
    container.append(...bookCards);
}

function addNewBook() {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const isRead = document.getElementById('isRead').checked;
    
    if (!title || !author) {
        alert('Please fill in all fields');
        return;
    }
    
    addBookToLibrary(title, author, isRead);
    
    // Clear form
    document.getElementById('newBookForm').reset();
}

const openDialog = document.getElementById('showDialog');
openDialog.addEventListener('click', () => {
    document.getElementById('dialog').showModal();
});

const closeDialog = document.getElementById('closeDialog');
closeDialog.addEventListener('click', () =>{
    document.getElementById('dialog').close();
});

const confirmBtn = document.getElementById('addNewBook');
confirmBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    addNewBook();
    document.getElementById('dialog').close();
    displayAllBooks();
});


displayAllBooks();

function deleteBook(id) {
    deleteBookFromLibrary(id);
    displayAllBooks(); // Re-render the entire list
}
