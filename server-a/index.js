
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Ladataan eläindata
const animalsFilePath = path.join(__dirname, 'data', 'animals.json');

function loadAnimals() {
  const raw = fs.readFileSync(animalsFilePath, 'utf8');
  return JSON.parse(raw);
}

// Health check
app.get('/health', (req, res) => {
  res.send('Server A OK');
});

// GET /animals
app.get('/animals', (req, res) => {
  const animals = loadAnimals();
  res.json(animals);
});

// GET /animals/:id
app.get('/animals/:id', (req, res) => {
  const animals = loadAnimals();
  const id = Number(req.params.id);
  const animal = animals.find(a => a.id === id);

  if (!animal) {
    return res.status(404).json({ error: 'Animal not found' });
  }

  res.json(animal);
});

// Frontend myöhemmin
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server A running on port ${PORT}`);
});
