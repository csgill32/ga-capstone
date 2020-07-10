const db = require('../models')

const index = (req, res) => {
    db.Recipe.find({}, (err, foundRecipes) => {
        if (err) console.log('Error in Recipe Index:', err)

        if (!foundRecipes) return res.json({
            message: 'No recipes found in database.'
        })

        res.status(200).json({ recipes: foundRecipes });
    })
}

const show = (req, res) => {
    db.Recipe.findById(req.params.id, (err, foundRecipe) => {
        if (err) console.log('Error in Recipe Show:', err)

        if (!foundRecipe) return res.json({
            message: 'Recipe with provided ID not found.'
        })

        res.status(200).json({ recipe: foundRecipe })
    })
}

const create = (req, res) => {
    db.Recipe.create(req.body, (err, savedRecipe) => {
        if (err) console.log('Error in Recipe Create:', err)

        if (!savedRecipe) return res.json({
            message: 'Error occurred while creating recipe.'
        })

        res.status(200).json({ recipe: savedRecipe })
    })
}

const update = (req, res) => {
    const options = { new: true }
    db.Recipe.findByIdAndUpdate(req.params.id, req.body, options, (err, updatedRecipe) => {
        if (err) console.log('Error in Recipes#update:', err)
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
// embedding ingredients
const ingredients = async (req, res) => {
    try {
        const updateData = {
            $push: {
                ingredients: {
                    name: req.body.name,
                    quantity: req.body.quantity,
                    measurement: req.body.measurement,
                    // user: req.session.currentUser.id,
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
        return res.json({ message: "Error adding ingredient" })
    }
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    ingredients
}