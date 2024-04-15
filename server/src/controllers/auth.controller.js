const PersonsService = require('../services/persons.service');
const service = new PersonsService();

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await service.authenticate(email, password);
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err.message });
  }
}

module.exports = { login };
