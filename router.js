const Router = require('express');
const TodoController = require('./TodoController.js');

const router = new Router();

router.get('/todos', TodoController.all);
router.post('/todos', TodoController.create);
router.put('/todos/:id', TodoController.update);
router.delete('/todos/:id', TodoController.delete);

export default router;