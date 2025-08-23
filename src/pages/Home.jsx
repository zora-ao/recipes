import { useState, useEffect } from "react"
import { FaHeart } from "react-icons/fa";
import Search from "../components/Search";
import RecipeList from "../components/RecipeList";
import { useDebounce } from "react-use";
import { Link } from "react-router";

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;


const Home = () => {
    const [searchRecipe, setSearchRecipe] = useState('');
    const [debounceSearch, setDebounceSearch] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useDebounce(() => setDebounceSearch(searchRecipe), 1000, [searchRecipe]);

    const fetchRecipes = async(query = '') => {
        setLoading(true);
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
            const data = await res.json();

            setRecipes(data.meals);

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRecipes(searchRecipe);
    }, [debounceSearch]);

    console.log(recipes)

    return (
        <section className="px-10 bg=[#f6f6f6]">
            <div className="flex justify-between my-10">
                <h1 className="inter text-4xl font-semibold">Recipe Search</h1>

                <Link to={'/favorites'} className="flex gap-2 items-center border border-gray-200 px-3 py-2 rounded inter shadow-lg">
                    <FaHeart />
                    Favorites
                </Link>
            </div>

            <Search searchRecipe={searchRecipe} setSearchRecipe={setSearchRecipe} />

            <RecipeList loading={loading} recipes={recipes} />
        </section>
    )
}

export default Home
