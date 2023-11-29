const form = document.getElementById("book-form");
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBookToList(book){
        const list = document.getElementById("book-list");
        const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    ${book.title}
                </td>
                <td>
                    ${book.author}
                </td>
                <td>
                    ${book.isbn}
                </td>
                <td>
                    <button class="delete btn btn-outline-danger">
                        X
                    </button>
                </td>
            `
        list.appendChild(row)
    }
    showAlert(message, className){
        const div = document.createElement("div");
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector(".container");
        container.insertBefore(div, form);
        setTimeout(() =>{
            document.querySelector(".alert").remove();
        }, 3000)
    }
    clearFields(){
        document.getElementById("book-title").value = "";
        document.getElementById("book-author").value = "";
        document.getElementById("book-isbn").value = "";
    }
    deleteBook(target){
        if (target.classList.contains("delete")) {
            target.parentElement.parentElement.remove();
        }
    }
}


form.addEventListener("submit", (e) =>{
    e.preventDefault();
    const titleValue = document.getElementById("book-title").value;
    const authorValue = document.getElementById("book-author").value;
    const isbnValue = document.getElementById("book-isbn").value;
    const book = new Book(titleValue, authorValue, isbnValue);
    const ui = new UI()
    if (titleValue === "" , authorValue === "" , isbnValue === "") {
        ui.showAlert("Please fill in all field", "error")
    }else{
        ui.addBookToList(book)
        ui.showAlert("The book has been added successfully", "success")
        ui.clearFields()
    }
    document.querySelector(".delete").addEventListener("click", (e) =>{
        ui.showAlert(`The book containing the title -- ${titleValue} -- has been removed`, "success");
        ui.deleteBook(e.target);
    })
})