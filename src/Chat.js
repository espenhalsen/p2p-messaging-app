import React, { useState, useEffect } from 'react';
import { db } from './firebase/firebase';

function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    db.collection('messages').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
  }, []);

  async function sendMessage(e) {
    e.preventDefault();
    await db.collection('messages').add({
      user: user.email,
      message,
      timestamp: Date.now()
    });
    setMessage('');
  }

  return (
    <div>
      <h1>Chat</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
      {messages.map(m => (
        <div key={m.timestamp}>
          <p>{m.user}: {m.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Chat;
