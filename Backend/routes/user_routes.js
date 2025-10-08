// src/routes/user_routes.js
const { Router } = require('express');
// 🔴 Yol birebir dosya adıyla uyuşmalı (alt çizgi!)
const { createUser, listUsers, loginUser } = require('../controllers/users_controller');

const router = Router();

// 🔴 Fonksiyonu ÇAĞIRMAYIN; referans verin (parantez yok)
router.post('/createUser', createUser); // POST /api/users
router.get('/', listUsers);   // GET  /api/users
router.post('/login', loginUser); // POST /api/users/login

module.exports = router;
