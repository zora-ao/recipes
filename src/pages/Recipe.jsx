import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Ingredients from "../components/Ingredients";
import {ClockLoader} from 'react-spinners';
import { FaHeart } from "react-icons/fa";
import { addFavorites, favoritesList } from "../appwrite";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

const Recipe = () => {

    const [recipeDetails, setRecipeDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const {id} = useParams();

    const fetchDetails = async() => {
        setLoading(true);
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await res.json();

            setRecipeDetails(data.meals);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    } 

    useEffect(() => {
        const checkFavorite = async() => {
            const favs = await favoritesList();
            const exist = favs.some((fav) => fav.meal_id === id);

            setIsFavorite(exist)
        }
        checkFavorite();
        fetchDetails();
    }, []);

    const handleAddFav = async(recipe) => {
        const status = await addFavorites(recipe)
        setIsFavorite(status)
        if(status){
            toast.success("Added to Favorites");
        } else {
            toast.success("Removed to Favorites");
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between px-4 md:px-20 my-4">
                <Link to={`/`} className="flex items-center poppins my-4 gap-x-2 ml-4">
                    <FaArrowLeft />
                    <span>Go back</span>
                </Link>

                <Link to={'/favorites'} className="flex gap-2 items-center border border-gray-200 px-3 py-2 rounded inter shadow-lg">
                    <FaHeart />
                    Favorites
                </Link>
            </div>
            {loading ? (
                <ClockLoader
                className="mx-auto mt-20"
                />
            ) : recipeDetails.length > 0 && (
                recipeDetails.map((recipe) => (
                    <div key={recipe.idMeal} className="md:px-14 px-8 pb-4">
                        <Toaster />
                        <div className="relative flex px-4 py-2 flex-wrap gap-x-10 rounded border border-gray-200 shadow-lg shadow-gray-100"> 
                            <img 
                            className="md:w-1/2 md:ml-10"
                            src={recipe.strMealThumb} 
                            alt={recipe.idMeal} />

                            <div className="">
                                <h1 className="playfair text-4xl font-bold my-4">{recipe.strMeal}</h1>
                                <h1 className="text-2xl playfair font-bold mt-4">Ingredients</h1>
                                <hr className="text-red-500 w-2/3 border mb-4" />
                                <Ingredients recipe={recipe} />
                            </div>

                            <button 
                            onClick={() => handleAddFav(recipe)}
                            className={`md:absolute cursor-pointer right-4 top-4 flex items-center gap-2 ${isFavorite ? 'text-red-500' : 'text-black'}`}>
                                <FaHeart />
                                <span>Add to Favorites</span>
                            </button>
                        </div>

                        <div className=" mx-auto">
                            <h1 className="font-bold playfair text-2xl mt-4">Procedures</h1>
                            <hr className="text-red-400 border mb-6" />
                            <p className="text-justify inter">
                                {recipe.strInstructions}
                            </p>
                        </div>

                    </div>
                ))
            )}
        </div>
    )
}

export default Recipe
