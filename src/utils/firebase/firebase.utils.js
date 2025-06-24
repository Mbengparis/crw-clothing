import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirecth, 
    signInWithPopup, 
    signInWithEmailAndPassword,
    GoogleAuthProvider 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4TkR1Mvt1J0GxTEBRFy3YYL2K_RPgeS8",
  authDomain: "crwn-clothing-db-1481c.firebaseapp.com",
  projectId: "crwn-clothing-db-1481c",
  storageBucket: "crwn-clothing-db-1481c.firebasestorage.app",
  messagingSenderId: "535960439826",
  appId: "1:535960439826:web:6b4e0351808504a8fc1ccb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//google authrntication through firebase
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
   prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup (auth, provider);

export const db = getFirestore();

//craeting user in firesbase after google auth
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  //if user data does not exist
  //create / set the document with data from userAuth in my collection
   if(!userSnapshot.exists()) {
     const { displayName, email} = userAuth;
     const createAt = new Date();

     try {
       await setDoc(userDocRef, {
        displayName,
        email,
        createAt
       })
     } catch (error) {
        console.log('error creating the user', error.message);
     }
   }

  //if user data exist
  //return userDocRef
   return userDocRef;
}