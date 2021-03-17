import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findByPk(
    req.params.userId,
  );
  return res.send(user);
});

router.get('/login', async (req, res) => {});

router.get('/logout', async (req, res) => {}); 

router.post('/addBook', async (req, res) => {}); //add a book sheet

router.get('/settings/infos', async (req, res) => {});

router.post('/settings/modify', async (req, res) => {});

module.exports = router