import {initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBcnP-XNkngU2q74b0a0vJOt6PM2fEYCVM",
    authDomain: "e-commerce-6262d.firebaseapp.com",
    projectId: "e-commerce-6262d",
    storageBucket: "e-commerce-6262d.appspot.com",
    messagingSenderId: "256674525290",
    appId: "1:256674525290:web:12003706d173cab0665a13"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters(
    {
        prompt: "select_account"
    }
  );

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

if(!userSnapshot.exsist()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
        });
    } catch(error){
        console.log('error creating user', error.message);
    }
}
    return userDocRef;
};