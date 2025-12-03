const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Load models
global.Vocab = require('./api/models/vocabModel');
global.User = require('./api/models/userModel');

// Load routes
const vocabRoutes = require('./api/routes/vocabRoutes');
const authRoutes = require('./api/routes/authRoutes');

mongoose.set('strictQuery', true);
mongoose.connect(
  'mongodb+srv://nguyenhkgcs230231_db_user:5VLFIMxct8zwmoJM@cluster1.u3k4vks.mongodb.net/?appName=Cluster1'
);

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register routes
vocabRoutes(app);
authRoutes(app);

app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);