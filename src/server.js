const express = require('express');
const cors = require('cors');
const firebase = require('firebase');

const app = express();

app.use(cors({ origin: true }));

const firebaseConfig = {
  // Your Firebase configuration goes here
};

firebase.initializeApp(firebaseConfig);

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
