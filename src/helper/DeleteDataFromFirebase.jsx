import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../firebase/FirebaseConfig";
const DeleteDataFromFirebase = async (collectionName, item) => {
  await deleteDoc(doc(database, collectionName, item.dbId));
};
export default DeleteDataFromFirebase;
