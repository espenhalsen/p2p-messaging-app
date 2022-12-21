const express = require('express');
const cors = require('cors');
const firebase = require('firebase');

const app = express();

app.use(cors({ origin: true }));

// Your Firebase configuration goes here

firebase.initializeApp(firebaseConfig);

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
