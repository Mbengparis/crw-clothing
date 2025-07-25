import { initializeApp } from 'firebase/app';

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QuerySnapshot
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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
   prompt: "select_account"
});


export const auth = getAuth();
export const signInWithGooglePopup = () =>
   signInWithPopup (auth, googleProvider);

export const signInWithGoogleRedirect = () => 
  signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch =  writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef =  doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })

    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
     acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}

//creating user in firesbase after google auth
export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}) => {

   if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  
  //if user data does not exist
  //create / set the document with data from userAuth in my collection
   if(!userSnapshot.exists()) {
     const { displayName, email} = userAuth;
     const createAt = new Date();

     try {
       await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation
       })
     } catch (error) {
        console.log('error creating the user', error.message);
     }
   }

  //if user data exist, return userDocRef
   return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth); 

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);