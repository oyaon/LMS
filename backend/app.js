
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Test route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});