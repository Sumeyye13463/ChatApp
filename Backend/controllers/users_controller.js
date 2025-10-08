// src/controllers/users_controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, password zorunlu' });
    }

    const hash = await bcrypt.hash(password, 10);
 
    const { rows } = await pool.query(
      `INSERT INTO users (name,email,password_hash)
       VALUES ($1,$2,$3)
       RETURNING id,name,email,created_at`,
      [name, email, hash]
    );

    return res.status(201).json(rows[0]);
  } catch (e) {
    if (e.code === '23505') {
      return res.status(409).json({ message: 'Email zaten kayıtlı' });
    }
    return res.status(500).json({ message: 'Sunucu hatası', detail: e.message });
  }
}

async function listUsers(req, res) {
  const { rows } = await pool.query(
    'SELECT id,name,email,created_at FROM users ORDER BY id DESC'
  );
  res.json(rows);
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'email ve password zorunlu' });

    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = rows[0];
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Şifre yanlış' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Giriş başarılı',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (e) {
    res.status(500).json({ message: 'Sunucu hatası', detail: e.message });
  }
}

module.exports = { createUser, listUsers, loginUser };
// 🔴 DİKKAT: module_exports DEĞİL, module.exports
