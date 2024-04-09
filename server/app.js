const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '12345678',
  port: 5432,
});

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenido a la aplicación de usuarios');
  });


// Ruta para obtener todos los usuarios
app.get('/users', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const users = result.rows;
    res.json(users);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener usuarios");
  }
});

// Ruta para crear un nuevo usuario
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
    const newUser = result.rows[0];
    res.status(201).json(newUser);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear usuario");
  }
});

// Ruta para actualizar un usuario por su ID
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [name, email, password, userId]);
    const updatedUser = result.rows[0];
    res.json(updatedUser);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar usuario");
  }
});

// Ruta para eliminar un usuario por su ID
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM users WHERE id = $1', [userId]);
    res.send(`Usuario con ID ${userId} eliminado correctamente`);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar usuario");
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});
