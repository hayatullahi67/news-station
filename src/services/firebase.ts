import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDTc8Uhj9psDFy3gYm4EABlfv-1fmRsz9Q', authDomain: 'crooz-66275.firebaseapp.com', projectId: 'crooz-66275',
  storageBucket: 'crooz-66275.firebasestorage.app', messagingSenderId: '976956522344', appId: '1:976956522344:web:d7d2100effc5c6f814a0dd', measurementId: 'G-MLQLC9XLJJ',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
