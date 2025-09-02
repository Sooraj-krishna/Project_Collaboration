// Import User and other necessary types/functions from Firebase Auth
import { signInWithPopup, GoogleAuthProvider, User, UserCredential , getAuth } from 'firebase/auth';
import { doc, getDoc, enableNetwork, disableNetwork } from 'firebase/firestore';
import { auth, firestore } from './config'; // Ensure you are correctly importing from your Firebase config

// Function to track authentication state changes
export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return auth.onAuthStateChanged(callback);
}

// Function for Google sign-in and role check
export async function signInWithGoogle(): Promise<{ user:User; isAdmin: boolean }> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ display: "popup" }); // Force popup

  try {
    // Ensure network is enabled before attempting sign-in
    await enableNetwork(firestore);
    
    const result: UserCredential = await signInWithPopup(auth, provider);
    const user: User = result.user;

    if (!user || !user.email) {
      throw new Error('Google sign-in failed');
    }

    // Restrict login to only emails from "gecskp.ac.in"
    // Restrict login to only emails from "gecskp.ac.in", except for a specific admin email
const allowedEmailPattern = /^[a-zA-Z0-9]+@gecskp\.ac\.in$/;
const adminOverrideEmail = "codecompass2024@gmail.com";

if (user.email !== adminOverrideEmail && !allowedEmailPattern.test(user.email)) {
  throw new Error('Only GEC SKP emails are allowed');
}

    try {
    const userDocRef = doc(firestore, 'adminemail', user.email);
    const userDoc = await getDoc(userDocRef);

    const isAdmin = userDoc.exists() && userDoc.data()?.role === 'admin';

    return {user, isAdmin };
    } catch (firestoreError) {
      console.error('Error accessing Firestore:', firestoreError);
      // If Firestore is offline, assume user is not admin for security
      return {user, isAdmin: false};
    }
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
}

export async function signOutWithGoogle(): Promise<void> {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error signing out with Google:', error);
    throw error;
  }
}
