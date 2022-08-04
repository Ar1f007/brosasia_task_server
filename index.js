require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const productRouter = require('./routes/product');

const connectDB = require('./db/connect');

app.use(cors());

app.use(express.json());

app.use('/api', productRouter);

app.get('/', (req, res) => {
  res.send('Running fine');
});

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log('Listening to port', PORT));
  } catch (error) {
    console.log(error);
  }
};

start();
