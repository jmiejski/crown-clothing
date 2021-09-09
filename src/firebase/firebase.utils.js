//Old wersion
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {

    apiKey: "AIzaSyCwe6vBKmSYviu-CpYaG-L43ZMC4nR71-s",
    authDomain: "crown-clothing-db-2c4a4.firebaseapp.com",
    projectId: "crown-clothing-db-2c4a4",
    storageBucket: "crown-clothing-db-2c4a4.appspot.com",
    messagingSenderId: "1039099153830",
    appId: "1:1039099153830:web:1a0bd862326865ce1e5367",
    measurementId: "G-5LFBFZB8L1"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
