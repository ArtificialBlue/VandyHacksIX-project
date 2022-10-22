
const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');


const router = require('./routes/mapRoute')
app.use('/',router)

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();