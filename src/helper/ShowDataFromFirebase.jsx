import { useEffect } from 'react';
import { database, auth } from '../firebase/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const ShowDataFromFirebase = (collectionName, setState) => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    const setDataFromDB = (data) => {
      getDocs(data).then((snapshot) => {
        setState(
          snapshot.docs.map((doc) => {
            return { ...doc.data() };
          })
        );
      });
    };

    const allDataInCollection = collection(database, collectionName);
    if (user) {
      const filterdDataByUser = query(
        allDataInCollection,
        where('userId', '==', user.uid)
      );
      setDataFromDB(filterdDataByUser);
    } else {
      setDataFromDB(allDataInCollection);
    }
  }, [user, collectionName, setState]);
};

export default ShowDataFromFirebase;
