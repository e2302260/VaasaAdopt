const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Server B OK');
});

app.listen(PORT, () => {
  console.log(`Server B running on port ${PORT}`);
});
