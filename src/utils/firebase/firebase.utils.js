import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyBcnP-XNkngU2q74b0a0vJOt6PM2fEYCVM",
    authDomain: "e-commerce-6262d.firebaseapp.com",
    projectId: "e-commerce-6262d",
    storageBucket: "e-commerce-6262d.appspot.com",
    messagingSenderId: "256674525290",
    appId: "1:256674525290:web:12003706d173cab0665a13"
  };


  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });
  
  export const auth = getAuth();
  export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);
  
  export const db = getFirestore();
  
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
     const collectionRef = collection(db, collectionKey);
     const batch = writeBatch(db);

     objectsToAdd.forEach(
      (object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object);
      }
     )

     await batch.commit();
     
  }

  export const getCategoriesAndDocuments = async () =>{
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q) 
    const categorymap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
      const {title, items} = docSnapshot.data()
      acc[title.toLowerCase()] = items;
      return acc
    }, {});

    return categorymap

  }


  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
  ) => {
    if (!userAuth) return;
  
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDocs(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };
  
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };
  
  export const signOutUser = async () => await signOut(auth)


  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);