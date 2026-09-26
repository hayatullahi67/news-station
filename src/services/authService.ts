// Auth service placeholder — connect to Firebase Auth when ready

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

export const authService = {
  login: (email: string, password: string) => signInWithEmailAndPassword(auth, email, password),
  logout: () => signOut(auth),
  getCurrentUser: () => auth.currentUser,
};
