import { motion } from "framer-motion";
import { fadeSteps } from "./animation/animate";

const TopSearch = ({mostSearchDish}) => {

    return (
        <div className="flex justify-evenly gap-x-3 overflow-x-auto">
            {mostSearchDish.map((recipe, index) => (
                <motion.div
                {...fadeSteps(0.5, (index + 1) / 3.5)}
                key={recipe.meal_id} 
                className="text-center min-w-[200px]">
                    <img 
                    className="w-[200px] h-[200px] rounded"
                    src={recipe.meal_thumb}
                    alt={recipe.meal_id} />
                    <h1 
                    className="text-[16px] poppins my-2"
                    >{recipe.meal_name}</h1>
                </motion.div>
            ))}
        </div>
    )
}

export default TopSearch
