import React from "react";
import HomeSearch from "./HomeSearch";

export default function AllRecipes() {
  return (
    <div>
      <div>All recipes</div>
      <input placeholder="Search" />
      <div>FIlter area</div>
      <HomeSearch />
    </div>
  );
}
