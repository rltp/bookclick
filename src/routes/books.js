import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const books = await req.context.models.Book.findAll();
  return res.send(books);
});

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

router.delete('/:bookId', async (req, res) => {
  await req.context.models.Book.destroy({
    where: { id: req.params.bookId },
  });

  return res.send(true);
});

export default router;
