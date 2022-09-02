import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCv5qahhacMBFzHoudLy-1P0pQBFvxR4VQ",
  authDomain: "fridgefy-bc22c.firebaseapp.com",
  projectId: "fridgefy-bc22c",
  storageBucket: "fridgefy-bc22c.appspot.com",
  messagingSenderId: "748677589620",
  appId: "1:748677589620:web:29919a7a36285981233f21"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);

// export default { provider, database };
