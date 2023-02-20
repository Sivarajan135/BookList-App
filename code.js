//Book class : Represent a book

class Book
{
    constructor(title , author , bookid)
    {
        this.title = title
        this.author = author
        this.bookid = bookid
    } 
}

// UI class : Handle UI tasks

class UI 
{
    static displayBooks()
    {
        const storedBooks = Store.getBooks();

        const books = storedBooks

        books.forEach(book => UI.addBookToList(book))
    }

    static addBookToList(book)
    {
        const list = document.getElementById('book-list')
        const row = document.createElement('tr')

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.bookid}</td>
        <td><button class = 'btn-delete'>Delete</button></td>
        `
        list.appendChild(row);

    }

    static clearField()
    {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('bookid').value = "";
    }

    static deleteBook(element)
    {
        if(element.classList.contains('btn-delete'))
        {
            element.parentElement.parentElement.remove();
        }
        UI.showAlert("Deleted Successfully....!" , 'remove');
    }

    static showAlert(Messege , className)
    {
        const div = document.createElement('div');
        div.setAttribute('id' , `${className}`);
        div.appendChild(document.createTextNode(Messege));
        const formContainer = document.getElementById('formContainer');
        const inp = document.getElementById('label');
        formContainer.insertBefore(div , inp); 

        // vanish

        setTimeout(() => {
            document.getElementById(`${className}`).remove();
        }, 1000)
    }
}

//Store class : Handles storage

class Store {
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
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(bookid) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.bookid === bookid) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  

//Event : Display Books

document.addEventListener('DOMContentLoaded' , UI.displayBooks);

// Event : Add a book

document.getElementById('formContainer').addEventListener('submit' , e => {

    //prevant the actual value
    e.preventDefault();

    //validate
    if(e.target[0].value == '' || e.target[1].value == '' || e.target[2].value == '')
    {
        UI.showAlert("Please Fill the All the Column" , 'alert');
    }
    else
    {
         //Initializes the book
        const book = new Book(e.target[0].value ,e.target[1].value , e.target[2].value)

        //Add book to UI
        UI.addBookToList(book)

        //Add book to Storage
        Store.addBook(book);

        //Success Message
        UI.showAlert('Book Added Successfully..!' , 'success')

        //clear Fields
        UI.clearField();
    }
})

//Event : Remove a book

document.getElementById('book-list').addEventListener('click' , e => {
    // remove from storage
    
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.deleteBook(e.target);
})

