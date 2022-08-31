import { useEffect } from 'react';
import { database, auth } from '../firebase/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const ShowDataFromFirebase = (collectionName, setState) => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    const allDataInCollection = collection(database, collectionName);
    if (user) {
      const filterdDataByUser = query(
        allDataInCollection,
        where('userId', '==', user.uid)
      );
      getDocs(filterdDataByUser).then((snapshot) => {
        setState(snapshot.docs.map((doc) => doc.data()));
      });
    } else {
      setState([]);
    }
  }, [user, collectionName, , setState]);
};

export default ShowDataFromFirebase;
