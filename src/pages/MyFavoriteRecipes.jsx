import React from "react";

export default function MyFavoriteRecipes() {
  const fakeArray = [{ name: "apple" }, { name: "lemon" }, { name: "melon" }];

  const fakeArrayCreate = (array) => {
    return array.map((data) => {
      return <div>{data.name}</div>;
    });
  };
  return (
    <div>
      <div>Favorite recipes</div>
      {fakeArrayCreate(fakeArray)}
    </div>
  );
}
