
const express = require('express');
const app = express();

const router = require('./routes/mapRoute')
console.log('11');
app.use('/',router)

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();