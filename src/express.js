const express = require('express');
const cors = require('cors');
const firebase = require('firebase');

const app = express();

app.use(cors({ origin: true }));

const firebaseConfig = {
    apiKey: "AIzaSyCiTroQLBPKRNbMMJUf5jCeEZyfD2RefpI",

    authDomain: "p2p-messaging-app.firebaseapp.com",

    projectId: "p2p-messaging-app",

    storageBucket: "p2p-messaging-app.appspot.com",

    messagingSenderId: "769793553222",

    appId: "1:769793553222:web:ae57b1d511536d92512b47"

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
