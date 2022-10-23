
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

// database
const connectDB = require('./database/connect');


const router = require('./routes/mapRoute')
app.use('/', router)
app
const port = process.env.PORT || 2000;
const start = async () => {
  try {
    console.log("Connecting to te database...");
    await connectDB('mongodb+srv://vandyproj:VandyHacks9@vandyhacks9.lgq8a.mongodb.net/?retryWrites=true&w=majority');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();