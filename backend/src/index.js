const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Library Management System API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));