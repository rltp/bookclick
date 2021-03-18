import { Router } from 'express';

const router = Router();

router.get('/:start/:end', async (req, res) => {
  const books = await req.context.models.Book.getList( req.params.start, req.params.end );
  return res.send(books);
});

//get infos from a book (title, author, year...)
router.get('/:bookId', async (req, res) => {
  const book = await req.context.models.Book.getInfos( req.params.bookId );
  return res.send(book);
});

//search bar
router.post('/search', async (req, res) => {
  const search = await req.context.models.Book.search( req.body.query );
  return res.send(search)
}); 

//titres similaires
router.get('/similarity/:bookId', async (req, res) => {
  const similars = await req.context.models.Cosim.similarityTop( req.params.bookId );
}); 

//search by genre (click on a button)
router.get('/genre', (req, res) => {
  const genre = ['romantic', 'thriller', 'fiction', 'fantastic']
  return res.send(genre);
}); 

//get books by genre
router.get('/search/:genre', async (req, res) => {
  const search = await req.context.models.Books.searchByCategory( req.params.genre )
  return res.send(search);
}); 

//get bests books (rated by other)
router.get('/bests', async (req, res) => {
  const bests = await req.context.models.Ratings.bestsBooks()
  return res.send(bests);
}); 

//get most popular books
router.get('/populars', async (req, res) => {
  const populars = await req.context.models.Ratings.popularsBooks()
  return res.send(populars);
}); 


//give a rating score + comment (optional)
router.post('/rate', async (req, res) => {
  const { book_id, score, comment } = req.body.rating;

  const rating = await req.context.models.Ratings.addRate(
    req.context.currentUser,
    book_id,score,comment
  );
  
  return res.send(edit);
});

//get the comments of a book
router.get('/comments/:bookID', async (req, res) => {
  const comments = await req.context.models.Ratings.getCommentsByBookID(req.params.bookID)
  return res.send(comments);
});

// remove a comment
router.delete('/comments/:ratingID', async (req, res) => {
  const deleted = await req.context.models.Ratings.removeCommentFromRatingID( req.context.currentUser, req.params.ratingID);
  return res.send(deleted);
});

module.exports = router
