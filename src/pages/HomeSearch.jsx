import React from "react";
import { useEffect, useState } from "react";

function HomeSearch() {

    const [HomeSearch, setHomeSearch] = useState([]);

    useEffect(() => {
        getHomeSearch();
    },[]);

    const getHomeSearch = async () => {
//storing data in local
        const check = localStorage.getItem('homesearh');
        if(check){
            setHomeSearch(JSON.parse(check));
        }else{
            const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=4`);
            const data = await api.json();

            localStorage.setItem("homesearch", JSON.stringify(data.results));
            console.log('data', data)
            setHomeSearch(data.results);
        }
    };
//filter
    function filter() {
        return (
            <div className="filter">
                <input type="text" placeholder="search recipe" className="filter-recipe"/>
                
            </div>
        )
    }
//recipes & images
    return <div>
        {HomeSearch.map((recipe) => {
            return(
                <div key={(recipe.id)}>
                    <div>
                        <p>{recipe.title}</p>
                        <img src={recipe.image} alt={recipe.title}></img>
                    </div>
                </div>   
            );
        })}
    </div>
};


export default HomeSearch;