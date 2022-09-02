import React from "react";
import { useEffect, useState } from "react";

function HomeSearch() {

    const [HomeSearch, setHomeSearch] = useState([]);
    // const [filterSearch, setfilterSearch] = useState("");

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
    // useEffect(() => { 
    //     getHomeSearch(filterSearch);
    //     <input type="text" placeholder="search recipe" onChange={e=> setHomeSearch(e.target.value)}></input>
    // });

//recipes & images
    return <div>
        {HomeSearch.map((recipe) => {
            return(
            
            <div className='grid-item' >
              <div className='recipe-image'>
                <img
                  img src={recipe.image} alt={recipe.title}
                />
              </div>
              <p>{recipe.title}</p>
              <div className='recipe-info'>
                <button className='styled-button'>more</button>
                <button className='styled-button'>add</button>
              </div>
            </div>  
            );
        })}
        <div className='grid-container'>
            <div className='grid-item' >
              <div className='recipe-image'>
                <img
                  src='https://assets.bonappetit.com/photos/60649584e6d8f20970dcf469/1:1/w_2560%2Cc_limit/Go-Live-Pad-See-Ew-new3.jpg'
                  alt=''
                />
              </div>
              <p>name of the recipe</p>
              <div className='recipe-info'>
                <button className='styled-button'>more</button>
                <button className='styled-button'>add</button>
              </div>
            </div>

            <div className='grid-item'>
              <div className='recipe-image'>
                <img
                  src='https://assets.bonappetit.com/photos/60649584e6d8f20970dcf469/1:1/w_2560%2Cc_limit/Go-Live-Pad-See-Ew-new3.jpg'
                  alt=''
                />
              </div>
              <p>name of the recipe</p>
              <div className='recipe-info'>
                <button className='styled-button'>more</button>
                <button className='styled-button'>add</button>
              </div>
            </div>

            <div className='grid-item'>
              <div className='recipe-image'>
                <img
                  src='https://www.comidaereceitas.com.br/wp-content/uploads/2007/11/Pastel_feiraaoo.jpg'
                  alt=''
                />
              </div>
              <p>name of the recipe</p>
              <div className='recipe-info'>
                <button className='styled-button'>more</button>
                <button className='styled-button'>add</button>
              </div>
            </div>

            <div className='grid-item'>
              <div className='recipe-image'>
                <img
                  src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/aperol-spritz-recipe-1628758400.jpg'
                  alt=''
                />
              </div>
              <p>name of the recipe</p>
              <div className='recipe-info'>
                <button className='styled-button'>more</button>
                <button className='styled-button'>add</button>
              </div>
            </div>
          </div>
    </div>
};


export default HomeSearch;