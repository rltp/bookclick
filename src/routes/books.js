import { Router } from 'express';

const router = Router();

router.get('/list/:start/:end', async (req, res) => {
  const books = await req.context.models.Book.getList( req.params.start, req.params.end );
  return res.send(books);
});

//get infos from a book (title, author, year...)
router.get('/details/:bookId', async (req, res) => {
  const book = await req.context.models.Book.getInfos( req.params.bookId );
  return res.send(book);
});

//search bar
router.post('/search', async (req, res) => {
  console.log(req.body)
  const search = await req.context.models.Book.search( req.body.query );
  console.log(search);
  return res.send(search)
}); 

//titres similaires
router.get('/similarity/:bookID', async (req, res) => {
  const similars = await req.context.models.Recommenders.Cosim.similarityTop( req.params.bookID );
  return res.send(similars)
}); 

//search by genre (click on a button)
router.get('/genre', (req, res) => {
  const genre = ['romantic', 'thriller', 'fiction', 'fantastic']
  return res.send(genre);
}); 

//get books by genre
router.get('/search/:genre', async (req, res) => {
  const search = await req.context.models.Book.searchByCategory( req.params.genre )
  return res.send(search);
}); 

//get average score for a book
router.get('/avg/:bookID', async (req, res) => {
  const avg = await req.context.models.Rating.getAverage(req.params.bookID)
  return res.send(avg);
}); 

//get bests books (rated by other)
router.get('/bests', async (req, res) => {
  const bests = await req.context.models.Rating.bestsBooks()
  return res.send(bests);
}); 

//get most popular books
router.get('/populars', async (req, res) => {
  const populars = await req.context.models.Rating.popularsBooks()
  return res.send(populars);
}); 


//get the comments of a book
router.get('/comments/:bookID', async (req, res) => {
  const comments = await req.context.models.Rating.getCommentsByBookID(req.params.bookID)
  return res.send(comments);
});

module.exports = router
