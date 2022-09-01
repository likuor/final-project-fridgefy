import React from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { database } from '../firebase/FirebaseConfig';
const DeleteDataFromFirebase = (collectionName, item) => {
  deleteDoc(doc(database, collectionName, item.dbId));
};
export default DeleteDataFromFirebase;
