import React from 'react'

const Ingredients = ({recipe}) => {
    const ingredients = [];

    for(let i = 0; i < 20; i++){
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];

        if(ingredient && ingredient !== ""){
            ingredients.push({
                ingredient,
                measurement: measure
            })
        }
    }

    console.log(ingredients)

    return (
        <div>
            {ingredients.map((item) => (
                <h1
                className='inter mb-2'
                ><strong>{item.ingredient}</strong> : {item.measurement}</h1>
            ))}
        </div>
    )
}

export default Ingredients
