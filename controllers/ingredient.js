// const db = require('../models')

// const index = (req, res) => {
//     db.Ingredient.find({}, (err, foundIngredients) => {
//         if (err) console.log('Error in Ingredient Index:', err)

//         if (!foundIngredients) return res.json({
//             message: 'No Ingredients found in database.'
//         })

//         res.status(200).json({ ingredients: foundIngredients });
//     })
// }

// const show = (req, res) => {
//     db.Ingredient.findById(req.params.id, (err, foundIngredients) => {
//         if (err) console.log('Error in Ingredient Show:', err)

//         if (!foundIngredients) return res.json({
//             message: 'Ingredient with provided ID not found.'
//         })

//         res.status(200).json({ ingredient: foundIngredients })
//     })
// }

// const create = (req, res) => {
//     db.Ingredient.create(req.body, (err, savedIngredient) => {
//         if (err) console.log('Error in Ingredient Create:', err)

//         if (!savedIngredient) return res.json({
//             message: 'Error occurred while creating Ingredient.'
//         })

//         res.status(200).json({ ingredient: savedIngredient })
//     })
// }

// const update = (req, res) => {
//     const options = { new: true }
//     db.Ingredient.findByIdAndUpdate(req.params.id, req.body, options, (err, updatedIngredient) => {
//         if (err) console.log('Error in Ingredient Update:', err)
//         if (!updatedIngredient) return res.json({
//             message: "No Ingredient with that ID found."
//         })

//         if (!updatedIngredient) return res.json({
//             message: 'Error occurred while updating ingredient.'
//         })

//         res.status(200).json({ ingredient: updatedIngredient })
//     })
// }

// const destroy = (req, res) => {
//     db.Ingredient.findByIdAndDelete(req.params.id, (err, deletedIngredient) => {
//         if (err) console.log('Error in Ingredient Destroy:', err)
//         if (!deletedIngredient) return res.json({
//             message: "No Ingredient with that ID found."
//         })

//         res.status(200).json({ ingredient: deletedIngredient })
//     })
// }

// module.exports = {
//     index,
//     show,
//     create,
//     update,
//     destroy
// }