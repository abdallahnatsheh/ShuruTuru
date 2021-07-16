const express = require('express'),
    userRoutes = require('./users');

var router = express.Router();


router.get('/users/', userRoutes.read_all_tours);
router.get('/guides', userRoutes.getGuides);
router.get('/users/:id', userRoutes.read_tour);
router.get('/read_site/:id', userRoutes.read_site);
router.post('/create_site/:id', userRoutes.create_site);
router.post('/create_tour', userRoutes.create_tour);
router.post('/create_guide', userRoutes.create_guide);
router.put('/users/:id', userRoutes.update_tour);
router.delete('/users/:id', userRoutes.delete_tour);
router.delete('/delete_site/:id/:name', userRoutes.delete_site);

module.exports = router;