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

        // Validations and error handling here

        res.status(200).json({ recipe: updatedRecipe })
    })
}

const destroy = (req, res) => {
    db.Recipe.findByIdAndDelete(req.params.id, (err, deletedRecipe) => {
        if (err) console.log('Error in Recipes#destroy:', err)
        if (!deletedRecipe) return res.json({
            message: "No Recipe with that ID found."
        })

        res.status(200).json({ recipe: deletedRecipe })
    })
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}