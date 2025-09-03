import { useState, useEffect } from "react"
import { FaHeart } from "react-icons/fa";
import Search from "../components/Search";
import RecipeList from "../components/RecipeList";
import { useDebounce } from "react-use";
import { Link } from "react-router";
import { SmoothCursor } from "../components/ui/smooth-cursor";
import TopSearch from "../components/TopSearch";
import { topSearch, mostSearch } from "../appwrite"

const Home = () => {
    const [searchRecipe, setSearchRecipe] = useState('');
    const [mostSearchDish, setMostSearchDish] = useState([]);
    const [debounceSearch, setDebounceSearch] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useDebounce(() => setDebounceSearch(searchRecipe), 1000, [searchRecipe]);

    const fetchMostSearch = async() => {
        try {
            const data = await topSearch();

            setMostSearchDish(data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchRecipes = async(query = '') => {
        setLoading(true);
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
            const data = await res.json();

            setRecipes(data.meals);

            if(query && data.meals.length > 0){
                await mostSearch(data.meals[0])
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRecipes(searchRecipe);
    }, [debounceSearch]);

    useEffect(() => {
        fetchMostSearch();
    }, [])

    return (
        <section className="relative md:px-10 px-4 bg=[#f6f6f6]">
            <SmoothCursor />
            <div className="flex justify-between my-10">
                <h1 className="inter md:text-4xl text-xl font-semibold">Recipe Search</h1>

                <Link to={'/favorites'} className="flex cursor-none gap-2 items-center border border-gray-200 px-3 py-2 rounded inter shadow-lg">
                    <FaHeart />
                    Favorites
                </Link>
            </div>

            <Search searchRecipe={searchRecipe} setSearchRecipe={setSearchRecipe} />

            <div className="">
                <h1 className="text-2xl inter mt-4">Most Search Dishes</h1>
                <hr className="border text-red-500 mb-4 w-[250px]" />
                <TopSearch mostSearchDish={mostSearchDish} />
                <hr className="border mt-4 text-gray-300" />
            </div>

            <div>
                <h1 className="text-2xl inter mt-4">Featured Dishes</h1>
                <hr className="border text-red-500 mb-4 w-[250px]" />
                <RecipeList loading={loading} recipes={recipes} />
            </div>
        </section>
    )
}

export default Home
