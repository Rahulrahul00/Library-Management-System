// Person class reprsent a generic person

class person{
    constructor(name){
        this.name = name;
    }
}


// Book class reprsent a book name and author name
class Book{
    constructor(title,author){
        this.title = title;
        this.author = author;
    }

    bookInfo(){

        return `${this.title} : By ${this.author}`  
    }
}

// library class to manage the collection  of books

class Library{
    constructor(){
        this.books = [];

    }

    // method to add a book to the library

    addBook(book){
        this.books.push(book);
        this.displayBooks();
    }

    //method to remove a book to the library
    removeBook(title){
        this.books = this.books.filter(book => book.title !== title);
        this.displayBooks();
    }

    // method to check if a book is available 

    isBookAvailable(title){
        return this.books.some(book => book.title === title)
    }

    // Methods to display available books in library

    displayBooks(){
        const bookList = document.getElementById("libraryBooks");
        bookList.innerHTML = '';
        this.books.forEach(book =>{
            const li = document.createElement('li');
            li.textContent = book.bookInfo();
            bookList.appendChild(li);
        });
    }
}


const library = new Library();


// Event Listener

// Add book button event

document.getElementById("addBookBtn").addEventListener('click', () =>{
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;

    if(title && author){
        library.addBook(new Book(title,author));
        document.getElementById("bookTitle").value = '';
        document.getElementById("bookAuthor").value = '';

    }else{
        alert('Please enter both title and author');
    }



});
