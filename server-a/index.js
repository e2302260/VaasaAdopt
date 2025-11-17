const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health-check
app.get('/health', (req, res) => {
  res.send('Server A OK');
});

// (Frontend-tiedostot tulevat myöhemmin public-kansioon)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server A running on port ${PORT}`);
});
