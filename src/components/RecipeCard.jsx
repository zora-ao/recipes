import { Link } from 'react-router-dom';
import noImg from '../assets/no-img.webp';
import { motion } from 'framer-motion';
import { fadeUp } from './animation/animate';


const RecipeCard = ({recipe}) => {
    return (
        <motion.div
        {...fadeUp}
        key={recipe.idMeal}
        className="w-[250px] h-[250px] rounded border relative overflow-hidden group duration-100 ease-in text-center shadow-sm shadow-gray-500">
            <img 
            src={recipe.strMealThumb ? recipe.strMealThumb : noImg} 
            className="group-hover:scale-103 duration-100 ease-in-out"
            alt={recipe.strMeal} />
            <div className='md:opacity-0 opacity-100 flex absolute bg-white group-hover:opacity-100 group-hover:bottom-0 md:-bottom-10 bottom-0 transition-all backdrop-blur-sm rounded w-full duration-500 ease-in-out flex-wrap items-center justify-evenly py-2'>
                <h1
                className="inter text-lg my-4"
                >{recipe.strMeal}</h1>
                <Link 
                to={`/recipe/${recipe.idMeal}`}
                className='bg-gray-700 px-3 py-2 cursor-none rounded inter text-white'>
                    View Recipe
                </Link>
            </div>
        </motion.div>
    )
}

export default RecipeCard
