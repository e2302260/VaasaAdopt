const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const animalsFilePath = path.join(__dirname, 'data', 'animals.json');

function loadAnimals() {
  const raw = fs.readFileSync(animalsFilePath, 'utf8');
  return JSON.parse(raw);
}

function saveAnimals(animals) {
  fs.writeFileSync(animalsFilePath, JSON.stringify(animals, null, 2), 'utf8');
}

app.get('/health', (req, res) => {
  res.send('Server A OK');
});

app.get('/animals', (req, res) => {
  const animals = loadAnimals();
  res.json(animals);
});

app.get('/animals/:id', (req, res) => {
  const animals = loadAnimals();
  const id = Number(req.params.id);
  const animal = animals.find(a => a.id === id);
  if (!animal) {
    return res.status(404).json({ error: 'Animal not found' });
  }
  res.json(animal);
});

// POST /animals/:id/adopt
app.post('/animals/:id/adopt', async (req, res) => {
  const animals = loadAnimals();
  const id = Number(req.params.id);
  const animal = animals.find(a => a.id === id);

  if (!animal) {
    return res.status(404).json({ error: 'Animal not found' });
  }

  if (animal.status !== 'available') {
    return res.status(409).json({ error: 'Animal not available for adoption' });
  }

  const { name, email, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const adoptionServiceUrl = 'http://localhost:4000/adoptions';

    const response = await axios.post(adoptionServiceUrl, {
      animalId: id,
      name,
      email,
      message
    });

    if (response.data && response.data.success) {
      // päivittä eläimen statuksen
      animal.status = 'adopted';
      saveAnimals(animals);

      return res.status(201).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Adoption service error' });
    }
  } catch (err) {
    if (err.response && err.response.status === 409) {
      return res.status(409).json({ error: 'Animal already adopted' });
    }
    console.error(err.message);
    return res.status(500).json({ error: 'Adoption failed' });
  }
});

// frontend
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server A running on port ${PORT}`);
});
