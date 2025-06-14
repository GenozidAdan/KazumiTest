import pool from '../models/db.js';

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows); // <-- PostgreSQL devuelve los datos en `rows`
  } catch (error) {
    console.error('Error en getUsers:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
      [name, email]
    );
    res.status(201).json({ id: result.rows[0].id, name, email });
  } catch (error) {
    console.error('Error en createUser:', error);
    return res.status(500).json({ message: error.message });
  }
};
