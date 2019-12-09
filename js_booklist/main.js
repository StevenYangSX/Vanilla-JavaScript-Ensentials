//This app will be developed using OOP
// So we do need a book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//Local Sotrage
class store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBook(isbn) {
        const books = store.getBooks();
        books.forEach( (book, index ) => {
            if(book.isbn == isbn) {
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//UI class for all UI
class UI {
    //In order to not need to instantiate a UI object , we 
    //make all the method here static
    static displayBooks() {

        const books = store.getBooks();

        books.forEach( book => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        list.appendChild(row);
    }

    //this function creates alert message and create realtiv HTML
    //element, then insert it to the proper place.
    //wacth the two parameters. we are passing in the displayed message
    //and the coressbonding class name to change color of the message.
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }


    static deleteBook(eventTarget) {
        if(eventTarget.classList.contains('delete')) {
            eventTarget.parentElement.parentElement.remove();
        }
    }

    static clearField() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}



//ALl events go here
document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    //validation
    if(title == '' || author == '' || isbn == '') {
        UI.showAlert('Check input fields.', 'danger');
    } else {
        const book = new Book(title,author, isbn); 
        //Add book to UI
        UI.addBookToList(book);
        //Add book to Loacl Storage
        store.addBook(book);
        //clear input field
        UI.clearField(); 
        UI.showAlert('Book Added Succefully.', 'success');
    }
   
})

//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    e.preventDefault();
    UI.deleteBook(e.target)
    //delete book from loacl storage
    //console.log(e.target.parentElement.previousElementSibling.textContent)
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book Deleted Succefully.', 'success');
})