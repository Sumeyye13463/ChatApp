const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const morgan = require('morgan'); 
const { pool } = require('./db');
const usersRouter = require('./routes/user_routes');

const app = express();

app.use(cors());        // frontend'ten istek için
app.use(express.json()); 
app.use(morgan('dev'));

app.get('/', (req, res) =>
  res.json({ ok: true, service: 'backend-projesi', endpoints: ['/health','/dbtest','/api/users'] })
);

// Sağlık kontrolü
app.get('/health', (req, res) => res.json({ ok: true }));

// DB test
app.get('/dbtest', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Bağlantı başarılı!', time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Bağlantı hatası!', error: err.message });
  }
});

// 👇 yeni: users router
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'backend-projesi', endpoints: ['/health', '/dbtest', '/users'] });
});


module.exports = app;
