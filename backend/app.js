
const express = require('express');
const app = express();

// database
const connectDB = require('./database/connect');


const router = require('./routes/mapRoute')
app.use('/',router)

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB('mongodb+srv://vandyproj:VandyHacks9@vandyhacks9.lgq8a.mongodb.net/?retryWrites=true&w=majority');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();