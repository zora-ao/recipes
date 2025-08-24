import { useEffect, useState } from "react"
import { favoritesList } from "../appwrite"
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { fadeUp } from "../components/animation/animate";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const Favorites = () => {

    const [favorites, setFavorites] = useState([]);
    
    useEffect(() => {
        const fetchFavorites = async() => {
            try {
                const docs = await favoritesList();

                setFavorites(docs || [])
            } catch (error) {
                console.log("FAILED TO FETCH APPWRITE LIST", error)
            }
        }

        fetchFavorites();
    }, []);

    return (
        <div className="px-6 pb-10">
            <Link to={'/'} className="flex items-center gap-2 my-2 inter">
                <FaArrowLeft />
                Go Back
            </Link>
            <h1 className="inter md:text-3xl text-xl font-semibold mt-5">Favorites</h1>
            <hr className="border mb-5 text-red-500 md:w-[150px] w-[100px]" />
            <div className="flex flex-wrap gap-x-2 gap-y-10 justify-evenly">
                {favorites.length > 0 && (favorites.map((fav) => (
                    <Tooltip key={fav.meal_id}>
                        <TooltipTrigger>
                            <motion.div {...fadeUp} className="border w-[250px]">
                            <Link to={`/recipe/${fav.meal_id}`}>
                                <img 
                                className=""
                                src={fav.meal_thumb} 
                                alt={fav.meal_name} />
                                <h2 className="poppins text-center my-3">{fav.meal_name}</h2>
                            </Link>
                            </motion.div>
                        </TooltipTrigger>
                            <TooltipContent>
                                Click to View Recipe
                            </TooltipContent>
                    </Tooltip>
                )))}
            </div>
        </div>
    )
}

export default Favorites
