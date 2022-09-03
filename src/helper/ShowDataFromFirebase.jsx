import { database } from '../firebase/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const ShowDataFromFirebase = async (collectionName, setState, user) => {
  if (user) {
    const allDataInCollection = collection(database, collectionName);
    const filterdDataByUser = query(
      allDataInCollection,
      where('userId', '==', user.uid)
    );
    const snapshot = await getDocs(filterdDataByUser);
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      dbId: doc.id,
    }));
    setState(data);
  } else {
    setState([]);
  }
};

export default ShowDataFromFirebase;
