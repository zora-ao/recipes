import { ClockLoader } from 'react-spinners';
import RecipeCard from './RecipeCard';

const RecipeList = ({recipes, loading}) => {

    return (
        <div className="flex flex-wrap justify-evenly mb-10 gap-x-1 gap-y-5">
            {loading ? (
                <ClockLoader />
            ) : recipes && recipes.length > 0 ? (recipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))) : <h1 className='text-2xl font-bold poppins'>Recipe not found!</h1>}
        </div>
    )
}

export default RecipeList
