import React from "react";
import DeleteDataFromFirebase from "../helper/DeleteDataFromFirebase";
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { database} from "../firebase/FirebaseConfig";

export default function MyFavoriteRecipes(props) {
  console.log("recipe", recipe);

  
  const [user] = useAuthState(auth)
  const [recipe, setRecipe] = useState([]);

  // ShowDataFromFirebase("recipe", setRecipe);

  const loadUserRecipe = async (user) => {
    if (user) {
      const allDataInCollection = collection(database, "recipe");
      const filterdDataByUser = query(
        allDataInCollection,
        where("userId", "==", user.uid)
      );
      const snapshot = await getDocs(filterdDataByUser);
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        dbId: doc.id,
      }));
      setRecipe(data);
    } else {
      setRecipe([]);
    }
  };

  const removeUserRecipe = async (data) => {
    console.log('data', data);
    await  DeleteDataFromFirebase('recipe', data); 
      const filteredArray = recipe.filter((itemList) => {
        return itemList.dbId !== data.dbId
      });
    setRecipe(filteredArray)
  }

  
  useEffect(() => {
    loadUserRecipe(user); 
  }, [user])


  return (
    <div>
      <button>Favorite recipes</button>
      <div>
        
        {recipe.map((data, index) => {
          console.log("data", data);
            return (
            <div key={index}>
              <div className="favorite_recipes">
                <div>{data.name}</div>
                <button onClick={() => {
                  removeUserRecipe(data); 
                }}>X</button>   
              </div>
              <div className="favorite_recipes">
              <div>{data.image}</div>
              <span>{data.information}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

