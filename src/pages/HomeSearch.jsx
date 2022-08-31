import { useEffect } from "react";

function HomeSearch() {

    useEffect(() => {
        getHomeSearch();
    },[]);

    const getHomeSearch = async () => {
        console.log('api key', process.env.REACT_APP_API_KEY)
        const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=10`);
        const data = await api.json();
        console.log(data); 
    }
}

export default HomeSearch;