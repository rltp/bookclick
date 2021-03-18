import { Router } from 'express';
import authenticate from "../middlewares/authenticate";

const router = Router();
router.use(authenticate)

//get all informations about the current user
router.get('/', async (req, res) => {
  const user = await req.context.models.User.getPrivateInfos(req.context.currentUser);
  return res.send(user);
});

//return all higher book from colaborative filtering
router.get('/colab', async (req, res) => {
  const predictions = await req.context.models.ALS.colaborativeTop(req.context.currentUser);
  return res.send(predictions);
});  

//get pourcent of recommandation for the connected user with als
router.get('/colab/:bookId', async (req, res) => {
  const prediction = await req.context.models.ALS.colaborativeScore(req.context.currentUser, req.params.bookID);
  return res.send(prediction);
}); 

//Get the user personal list of books
router.get('/library', async (req, res) => {
  const library = await req.context.models.saveAs.getPrivateList(req.context.currentUser);
  return res.send(library);
});

// Get books group by type
router.get('/librairy/groupby/:type', async (req, res) => {
  const prediction = await req.context.models.saveAs.getListGrouped(req.context.currentUser, req.params.type);
  return res.send(prediction);
});

//save as favorites, to-read...
router.post('/librairy/save', async (req, res) => {
  const saved = await req.context.models.saveAs.saveBook(req.context.currentUser, req.body.type, req.body.bookID);
  return res.send(saved);
});

router.post('/edit', async (req, res) => {
  const {
    pseudo, firstname, lastname,
    address, city, postcode, country_code,
    email, password
  } = req.body.user;

  const edit = await req.context.models.User.edit(
    req.context.currentUser, 
    {
      'pseudo': pseudo, 'firstname': firstname, 'lastname': lastname,
      'address': address, 'city': city,'postcode': postcode, 'country_code': country_code,
      'email': email, 'password': password
    }
  );
  return res.send(edit);
});

module.exports = router
