import { Link } from 'react-router-dom';
import noImg from '../assets/no-img.webp';

const RecipeCard = ({recipe}) => {
    return (
        <div
        key={recipe.idMeal}
        className="w-[250px] overflow-hidden group duration-100 ease-in text-center pb-2 shadow-sm shadow-gray-500 rounded">
            <img 
            src={recipe.strMealThumb ? recipe.strMealThumb : noImg} 
            className="rounded-tl-sm group-hover:scale-103 duration-100 ease-in-out rounded-tr-sm"
            alt={recipe.strMeal} />
            <div className='flex flex-wrap items-center justify-evenly'>
                <h1
                className="inter text-lg my-4"
                >{recipe.strMeal}</h1>
                <Link 
                to={`/recipe/${recipe.idMeal}`}
                className='bg-gray-700 px-3 py-2 cursor-none rounded inter text-white'>
                    View Recipe
                </Link>
            </div>
        </div>
    )
}

export default RecipeCard
