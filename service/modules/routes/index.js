const express = require('express');
const router = express.Router();

const loginController = require('./../controller/login/')
const getController = require('./../controller/read')
const postController = require('./../controller/create')

const deleteController = require('./../controller/delete')
const putController = require('./../controller/update')

// Rota para o processo de login
router.post('/login', loginController.login);
// router.post('/post',loginController.postEvent);
router.get('/read/:tablename',getController.getEvent);
router.post('/post/:tablename',postController.postEvent)
router.delete('/delete/:tablename/:id', deleteController.deleteEvent)
router.put('/post/:tablename/:titlevalue', putController.putEvent)
module.exports = router;