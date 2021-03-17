import { Router } from 'express';

const router = Router();

router.get('/:start/:end', async (req, res) => {
  const books = await req.context.models.Book.findAll();
  return res.send(books);
});

//get infos from a book (title, author, year...)
router.get('/:bookId', async (req, res) => {
  const book = await req.context.models.Book.findByPk(
    req.params.bookId,
  );
  return res.send(book);
});

router.post('/', async (req, res) => {
  const book = await req.context.models.Book.create({
    text: req.body.text,
    //
    userId: req.context.me.id,
  });

  //s3 upload imager

  return res.send(book);
});


//search bar
router.post('/search', async (req, res) => {
  const search = await req.sequelize.query(
    "SELECT title, authors, publication_year FROM public.Books WHERE title = :title OR authors = :authors) OR tag_name = IN(:tag_name)",
    {
      replacements: { 
        title: title,
        authors: authors,
        tag_name: [tag_name]
      },
      type: QueryTypes.SELECT
    });
  return res.send(search)
}); 


//titres similaires
router.get('/similarity/:bookId', async (req, res) => {
  const similars = await req.sequelize.query(
    "SELECT C.book_j, B.title FROM public.Cosim JOIN public.Books ON C.book_i = B.book_id WHERE book_i = :book_i ORDER BY similarity DESC",
    {
      replacements: { 
        book_i: book_i
      },
      type: QueryTypes.SELECT
    });

  return res.send(similars);
}); 


//search by genre (click on a button)
router.get('/genre', async (req, res) => {
  const genre = await req.sequelize.query(
    "SELECT book_id, tag_name FROM public.Books WHERE book_id = :book_id AND tag_name = :genre",
    {
      replacements: { 
        genre: ['Fantastic', 'Polar', 'Historic', 'Thriller', 'Adventure', 'Biography']
      },
      type: QueryTypes.SELECT
    });

  return res.send(genre);
}); 

//get books by genre
router.get('/search/:genre', async (req, res) => {
  const search = await req.sequelize.query(
    "SELECT title, authors, publication_year FROM public.Books WHERE tag_name = :genre",
    {
      replacements: { 
        genre: ['Fantastic', 'Polar', 'Historic', 'Thriller', 'Adventure', 'Biography']
      },
      type: QueryTypes.SELECT
    });

  return res.send(search);

}); 


//get bests books (rated by other)
router.get('/bests', async (req, res) => {

  const bests = await req.sequelize.query("SELECT B.book_id, B.title, B.authors, AVG(R.score) as mean_score FROM public.Books JOIN public.Ratings R ON R.book_id = B.book_id ORDER BY mean_score DESC");

  return res.send(bests);
}); 


//get most popular books
router.get('/popular', async (req, res) => {
  const populars = await req.sequelize.query("SELECT B.book_id, B.title, B.authors, COUNT(R.score) as ratings_count FROM public.Books JOIN public.Ratings R ON R.book_id = B.book_id ORDER BY ratings_count DESC");

  return res.send(populars)
}); 

module.exports = router
