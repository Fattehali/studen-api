const express = require('express');
const bodyParser = require('body-parser');
const studentsRoute = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/students', studentsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
