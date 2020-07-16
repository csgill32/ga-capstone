const db = require('../models')

const index = (req, res) => {
    console.log(req.session)
    db.Recipe.find({ user: req.session.currentUser.id }, (err, foundRecipes) => {
        if (err) console.log('Error in Recipe Index:', err)

        if (!foundRecipes) return res.json({
            message: 'No recipes found in database.'
        })

        res.status(200).json({ recipes: foundRecipes, user: req.session.currentUser });
    })
}

const show = (req, res) => {
    db.Recipe.findById(req.params.id).populate("user", "-password").exec(function (err, foundRecipe) {
        if (err) console.log('Error in Recipe Show:', err)

        if (!foundRecipe) return res.json({
            message: 'Recipe with provided ID not found.'
        })

        res.status(200).json({ recipe: foundRecipe, user: req.session.currentUser })
    })
}

const create = (req, res) => {
    const recipe = {
        name: req.body.name,
        directions: req.body.directions,
        user: req.session.currentUser.id,
        ingredients: req.body.ingredients,
    }
    db.Recipe.create(recipe, (err, savedRecipe) => {
        if (err) console.log('Error in Recipe Create:', err)

        if (!savedRecipe) return res.json({
            message: 'Error occurred while creating recipe.'
        })

        res.status(200).json({ recipe: savedRecipe, user: req.session.currentUser })
    })
}

const update = (req, res) => {
    const options = { new: true }
    console.log(req.body);
    db.Recipe.findByIdAndUpdate(req.params.id, req.body, options, (err, updatedRecipe) => {
        if (err) console.log('Error in Recipes Update:', err)
        if (!updatedRecipe) return res.json({
            message: "No Recipe with that ID found."
        })

        if (!updatedRecipe) return res.json({
            message: 'Error occurred while updating recipe.'
        })

        res.status(200).json({ recipe: updatedRecipe })
    })
}

const destroy = (req, res) => {
    db.Recipe.findByIdAndDelete(req.params.id, (err, deletedRecipe) => {
        if (err) console.log('Error in Recipes Destroy:', err)
        if (!deletedRecipe) return res.json({
            message: "No Recipe with that ID found."
        })

        res.status(200).json({ recipe: deletedRecipe })
    })
}

// // Search 
// const search = (req, res) => {
//     db.Recipe.find({ name: { $regex: req.query.name, $options: "i" } }, function (error, foundRecipes) {
//         if (error) {
//             console.log('Error in Search Recipes', error);
//             if (!foundRecipes) return res.json({
//                 message: "No recipe with that name found"
//             });
//         }
//         res.status(200).json({ recipes: foundRecipes, user: req.session.currentUser });
//     })
// };

// embedding ingredients
const ingredients = async (req, res) => {
    try {
        const updateData = {
            $push: {
                ingredients: {
                    name: req.body.name,
                    quantity: req.body.quantity,
                    measurement: req.body.measurement,
                },
            },
        };
        const updatedRecipe = await db.Recipe.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        console.log(updatedRecipe);
        res.status(200).json({
            status: 200,
            message: "Ingredient Successfully Added",
        })
    } catch (error) {
        console.log(error);
        return res.json({ message: "Unable to add ingredient" })
    }
}

const updateIngredient = async (req, res) => {
    try {
        const foundRecipe = await db.Recipe.findById(req.params.id);
        let ingredientIndex = foundRecipe.ingredients.findIndex(i => i._id == req.params.ingredientId);
        let ingredient = foundRecipe.ingredients[ingredientIndex]
        foundRecipe.ingredients[ingredientIndex] = { ...ingredient, ...req.body }
        console.log(ingredientIndex);

        // foundRecipe.ingredients.findByIdAndUpdate(req.params.ingredientId, req.body, { new: true });
        await foundRecipe.save()
        res.status(200).json({
            status: 200,
            message: "Ingredient Sucessfully Updated",
        })
    } catch (error) {
        console.log(error);
        return res.json({ message: "Unable to edit ingredient" });
    }
}

const destroyIngredient = async (req, res) => {
    try {
        const foundRecipe = await db.Recipe.findById(req.params.id);
        foundRecipe.ingredients.remove(req.params.ingredientId);
        await foundRecipe.save();
        res.status(200).json({
            status: 200,
            message: "Ingredient Sucessfully Deleted",
        })
    } catch (error) {
        console.log(error);
        return res.json({ message: "Unable to delete ingredient" });
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    // search,
    ingredients,
    updateIngredient,
    destroyIngredient
}