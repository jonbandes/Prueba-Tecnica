const { Router } = require('express');
const router = Router();

const { loginCtrl, getUsers, createUser, getUser, deleteUser, updateUser } = require('../controllers/index.controller')


router.post('/api/v1/users/login', loginCtrl)
router.get('/api/v1/users/', getUsers);
router.get('/api/v1/users/:id', getUser);
router.post('/api/v1/users', createUser);
router.delete('/api/v1/users/:id', deleteUser);
router.put('/api/v1/users/:id', updateUser);


module.exports = router;

