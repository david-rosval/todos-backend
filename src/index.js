import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { pool } from './db.js';
import openapi from './openapi.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.redirect('/docs'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.get('/api/todos', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/todos', async (req, res, next) => {
  try {
    const title = req.body?.title?.trim();
    if (!title) return res.status(400).json({ error: 'title is required' });
    const [result] = await pool.query('INSERT INTO todos (title) VALUES (?)', [title]);
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/todos/:id', async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'todo not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal server error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Todos API listening on port ${port}`));
