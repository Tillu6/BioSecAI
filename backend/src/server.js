const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const biometrics = require('./routes/biometrics');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/biometrics', biometrics);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));