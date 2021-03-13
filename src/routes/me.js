import { Router } from 'express';

const router = Router();

router.get('/login', async (req, res) => {

}); 

router.get('/logout', async (req, res) => {}); 


//choose which one we use for CF: Kmeans / ALS
router.get('/collab', async (req, res) => {
  const collab = await req.sequelize.query(
    "SELECT A.book_id, B.title, A.prediction FROM public.ALs JOIN public.Books B ON A.book_id = B.book_id WHERE user_id = :user_id ORDER BY prediction DESC",
    {
      replacements: { user_id: user_id },
      type: QueryTypes.SELECT
    }
    );

  return res.send(collab);

});  

//get pourcent of recommandation for the connected user with als
router.get('/collab/:bookId', async (req, res) => {
  const prediction = await req.sequelize.query(
    "SELECT A.book_id, B.title, A.prediction FROM public.ALs JOIN public.Books B ON A.book_id = B.book_id WHERE user_id = 55 AND book_id = 55",
    {
      replacements: { user_id: user_id },
      type: QueryTypes.SELECT
    }
    );

  return res.send(prediction);

}); 

//router.get('/hybrid', async (req, res) => {}); 

router.get('/favorite/:type', async (req, res) => {
  switch(req.params.type){
    case 'authors':
      const fav_authors = await req.sequelize.query("SELECT B.book_id, B.title, COUNT(B.authors) as Occur_authors FROM public.Books B JOIN public.Ratings R ON B.book_id = R.book_id GROUP BY B.authors HAVING Occur_authors > 2 ORDER BY Occur_athors DESC");
      break;
    case 'genres':
      break;
  }
});

//give a rating score + comment (optional)
router.post('/rate', async (req, res) => {
  switch(req.params.type){
    case 'rating':
      const add_rating = await req.sequelize.query(
        "INSERT INTO public.Ratings (id, user_id, book_id, score) VALUES (:id, :user_id, :book_id, :score)",
        {
          replacements: { 
            id: id, 
            user_id: user_id,
            book_id : book_id,
            score : score 
          },
          type: QueryTypes.INSERT
        }
      );
      return res.send(add_rating);
      break;
    case 'comment':
      const add_review = await req.sequelize.query(
        "INSERT INTO public.Ratings (id, user_id, book_id, score, comment) VALUES (:id, :user_id, :book_id, :score, :comment)",
        {
          replacements: { 
            id: id, 
            user_id: user_id,
            book_id : book_id,
            score : score, 
            comment: comment
          },
          type: QueryTypes.INSERT
        }
        );
      return res.send(add_review);
      break;
  }
}); 

//save as favorites, to-read...
router.post('/saveAs', async (req, res) => {
  const saveAs = await req.sequelize.query(
    "INSERT INTO public.SaveAs (user_id, book_id, category) VALUES (:user_id, :book_id, :category)",
    {
      replacements: { 
        id: id, 
        user_id: user_id,
        category : category,
      },
      type: QueryTypes.INSERT
    });

  return res.send(saveAs);
}); 

//Get the user personal list of books
router.get('/library', async (req, res) => {
  const library = await req.sequelize.query(
    "SELECT S.book_id, B.title, B.authors FROM public.SaveAs S JOIN public.Books B ON S.book_id = B.book_id WHERE user_id = :user_id AND S.category = 'to-read' OR S.category = 'favorites' OR S.category = 'owned'",
    {
      replacements: { 
        user_id: user_id,
      },
      type: QueryTypes.SELECT
    });

  return res.send(library);

});

router.get('/settings/infos', async (req, res) => {
  const set_infos = await req.sequelize.query(
    "SELECT pseudo, firstname, lastname, email, address, city, postcode, country_code FROM public.Users WHERE id = :id",
    {
      replacements: { 
        id: id,
      },
      type: QueryTypes.SELECT
    });

  return res.send(set_infos);
});

router.post('/settings/edit', async (req, res) => {
  const edit_infos = await req.sequelize.query(
    "UPDATE public.Users SET pseudo, firstname, lastname, email, address, city, postcode, country_code WHERE id = :id",
    {
      replacements: { 
        id: id,
      },
      type: QueryTypes.UPDATE
    });

  return res.send(edit_infos);
});

export default router;
