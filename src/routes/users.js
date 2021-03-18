import { Router } from 'express';

const router = Router();

//show the public profil user
router.get('/:userID', async (req, res) => {
  const user_list = await req.context.models.User.getPublicInfos(req.params.userID)
  return res.send(user_list);
});

//show the book list of the user
router.get('/list/:userID', async (req, res) => {
  const user_list = await req.context.models.saveAs.getPublicList(req.context.models, req.params.userID)
  return res.send(user_list);
}); 

module.exports = router