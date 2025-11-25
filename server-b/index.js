const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const adoptionsFilePath = path.join(__dirname, 'data', 'adoptions.json');

function loadAdoptions() {
  if (!fs.existsSync(adoptionsFilePath)) {
    return [];
  }
  const raw = fs.readFileSync(adoptionsFilePath, 'utf8');
  if (!raw.trim()) {
    return [];
  }
  return JSON.parse(raw);
}

function saveAdoptions(adoptions) {
  fs.writeFileSync(adoptionsFilePath, JSON.stringify(adoptions, null, 2), 'utf8');
}

app.get('/health', (req, res) => {
  res.send('Server B OK');
});

app.post('/adoptions', (req, res) => {
  const { animalId, name, email, message } = req.body;

  if (!animalId || !name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const adoptions = loadAdoptions();

  const existing = adoptions.find(a => a.animalId === animalId);
  if (existing) {
    return res.status(409).json({ error: 'Animal already adopted' });
  }

  const newAdoption = {
    animalId,
    name,
    email,
    message: message || '',
    date: new Date().toISOString()
  };

  adoptions.push(newAdoption);
  saveAdoptions(adoptions);

  res.status(201).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server B running on port ${PORT}`);
});
