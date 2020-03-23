import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBAW7QPzqMfkFDDswtypLpcJija8ZOGX5U",
  authDomain: "crwn-db-71b28.firebaseapp.com",
  databaseURL: "https://crwn-db-71b28.firebaseio.com",
  projectId: "crwn-db-71b28",
  storageBucket: "crwn-db-71b28.appspot.com",
  messagingSenderId: "178637513796",
  appId: "1:178637513796:web:420fd8015627315c1f8811",
  measurementId: "G-BYNRWEFJEB"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;