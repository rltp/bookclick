import { Router } from 'express';

const router = Router();

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );
  return res.send(user);
});

//show the book list of the user
router.get('/list/:userID', async (req, res) => {
  const user_list = await req.sequelize.query(
    "SELECT book_id FROM public.SaveAs WHERE user_id = :user_id category = 'to-read' OR category = 'favorites' OR category = 'owned'",
    {
      replacements: { 
        user_id: user_id,
      },
      type: QueryTypes.SELECT
    });

  return res.send(user_list);
}); 


module.exports = router