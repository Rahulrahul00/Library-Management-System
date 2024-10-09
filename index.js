// Person class reprsent a generic person

class Person{
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


// students class for borrowing and return books

class Student extends Person{
    constructor(name){
        super(name);
        this.borrowedBooks = [];


    }
    borrowBook(title,library){
        if(library.isBookAvailable(title)){
            this.borrowedBooks.push(title);
            library.removeBook(title);
            this.displayBorrowedBooks();
        }else{
            alert(`${title} is not available in the libraary.` )
        }
    }


    returnBook(title,library){
        const index = this.borrowedBooks.indexOf(title);
        if(index !== -1){
            this.borrowedBooks.splice(index,1);
            library.addBook(new Book(title,author));
            this.displayBorrowedBooks();
        }else{
            alert(`${title} is not borrowed`);
        }
    }


    // Method to display the  borrowed books by the student

    displayBorrowedBooks(){
        const borrowedList = document.getElementById('borrowedBooks');
        borrowedList.innerHTML = '',
        this.borrowedBooks.forEach(bookTitle =>{
            const li = document.createElement('li');
            li.textContent = bookTitle;
            borrowedList.appendChild(li);
        });
    }

}


const library = new Library();
const student = new Student("rahul");


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


//Remove Book button

document.getElementById("removeBookBtn").addEventListener('click', () =>{
    
    const title = document.getElementById("bookTitle").value;
    if(title){
        library.removeBook(title);
        document.getElementById('bookTitle').value = '';
    }else{
        alert('Please enter a book title to remove');
    }
});

// Borrow Book button

document.getElementById("borrowBookBtn").addEventListener('click', ()=>{
    const title = document.getElementById("borrowBookTitle").value;

    if(title){
        student.borrowBook(title,library);
        document.getElementById('borrowBookTitle').value = '';

    }else{
        alert('please enter a book title to borrow');
    }
});

// return book button event

document.getElementById('returnBookBtn').addEventListener('click', () => {
    const title = document.getElementById('returnBookTitle').value;
    if(title){
        student.returnBook(title, library);
        document.getElementById('returnBookTitle').value = '';
    }else{
        alert('Please enter a book title to return');
    }
});