// book class :represent a book 
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


// Ui class:handel Ui tasks:
class UI{
    static displayBooks() {
        const books = Store.getBooks();;
        books.forEach(book => UI.addBookToList(book));
    }
    static addBookToList(Book) {
        const list = document.querySelector("#book-list");
        const row = document.querySelector('tr')

        row.innerHTML = `<td>${Book.title}</td>
                         <td>${Book.author}</td>
                         <td>${Book.isbn}</td>
                         <td><a class="btn btn-danger btn-sm delete">X</a></td>
                         `;

        list.appendChild(row);
    }
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }

    }

    

    static showAlert(message,className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form) 
        //vanish in 3s
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}


// store class:handle Storages 
class store{
    static getBooks(){
        let books = [];
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book,index) =>{
            if(books.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}


// Event:display book
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event add a book
document.querySelector('#book-form').addEventListener('submit', function(e) {
    e.preventDefault();
      //get form values
      const title = document.querySelector('#title').value;
      const author = document.querySelector('#author').value;
      const isbn = document.querySelector('#isbn').value
  
      //validate title and author
      if (title === "" || author === "" || isbn === "") {
          UI.showAlert("Please fill all fields ", 'danger');
      } else {
          //Instantiate books
          const book =  new Book(title, author, isbn);
  
          //add book to UI
          UI.addBookToList(book);

          //add book to Store
          store.addBook(book);

          //show success message
          UI.showAlert("book added","success");
  
          //clear fields
          UI.clearFields();
      }
})

// Event : remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)

    //show success message
    UI.showAlert("book removed","success");
});