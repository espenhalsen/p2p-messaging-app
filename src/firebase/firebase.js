import 'firebase/auth';
import 'firebase/firestore';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";



const firebaseConfig = {

  apiKey: "AIzaSyCiTroQLBPKRNbMMJUf5jCeEZyfD2RefpI",

  authDomain: "p2p-messaging-app.firebaseapp.com",

  projectId: "p2p-messaging-app",

  storageBucket: "p2p-messaging-app.appspot.com",

  messagingSenderId: "769793553222",

  appId: "1:769793553222:web:ae57b1d511536d92512b47"

};


const app = initializeApp(firebaseConfig)

export const auth = app.auth();
export const db = app.firestore();

export async function generateUserDocument(user, additionalData) {
  if (!user) return;

  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    try {
      await userRef.set({
        email,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
}

export function getUserDocument(uid) {
  if (!uid) return null;
  try {
    return db.collection('users').doc(uid).get();
  } catch (error) {
    console.error('Error fetching user', error);
  }
}
