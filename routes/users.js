const express = require('express');
const { createUser, getUsers, getUser, deleteUser, updateUser, loginUser, updateLikeInUser} = require('../controllers/UserController');
const router = express.Router();

// Public routes
router.post('/login', loginUser);
router.post('/register', createUser);

// Protected routes
router.get('/' , getUsers);
router.get('/:id',getUser);

router.delete('/:id', deleteUser);
router.patch('/:id' , updateUser);

router.patch('/addLike/:id' , updateLikeInUser);


module.exports = router;