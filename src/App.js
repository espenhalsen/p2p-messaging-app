import React, { useState, useEffect } from 'react';
import Login from './Login';
import Chat from './Chat';
import { auth } from './firebase/firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  return user ? <Chat user={user} /> : <Login />;
}

export default App;
