import { useEffect, useState } from "react"
import { favoritesList } from "../appwrite"
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

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

    console.log(favorites)

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
                    <div className="border w-[250px]">
                        <img 
                        className=""
                        src={fav.meal_thumb} 
                        alt={fav.meal_name} />
                        <Link to={`/recipe/${fav.meal_id}`}>
                            <h2 className="poppins text-center my-3">{fav.meal_name}</h2>
                        </Link>
                    </div>
                )))}
            </div>
        </div>
    )
}

export default Favorites
