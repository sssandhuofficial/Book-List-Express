// define the book model
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // find all books in the books collection
    booksModel.find((err, booksCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    });
}

//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {

    /*****************
    * ADD CODE HERE *
    *****************/

    res.render('books/add', {
        title: 'Add a New Book',
        book: new Book()
      });
}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {

    /*****************
     * ADD CODE HERE *
     *****************/

    const book = new Book({
        name: req.name,
        author: req.author,
        published: req.published,
        description: req.description,
        price: req.price
      });
      book.save((err) => {
        if (err) {
          return console.error(err);
        }
        res.redirect('/books/list');
      });
}

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {

    /*****************
     * ADD CODE HERE *
     *****************/
    const id = req.params.id;
    Book.findById(id, (err, book) => {
    if (err) {
      return console.error(err);
    }
    res.render('books/edit', {
      title: 'Edit Book',
      book: book
    });
  });

}

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
    /*****************
    * ADD CODE HERE *
    *****************/
    const id = req.params.id;
    Book.findByIdAndUpdate(id, {
      name: req.name,
      author: req.author,
      published: req.published,
      description: req.description,
      price: req.price
    }, (err) => {
      if (err) {
        return console.error(err);
      }
      res.redirect('/books/list');
    });
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    /*****************
  * ADD CODE HERE *
  *****************/

    const id = req.params.id;
  Book.findByIdAndRemove(id, (err) => {
    if (err) {
      return console.error(err);
    }
    res.redirect('/books/list');
  });
}