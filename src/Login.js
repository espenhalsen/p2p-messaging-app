import React, { useState } from 'react';
import { auth, generateUserDocument } from './firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(e) {
    e.preventDefault();
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      generateUserDocument(user, { uid: uuidv4() });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={login}>
      <h1>Log in</h1>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Log in</button>
    </form>
  );
}

export default Login;
