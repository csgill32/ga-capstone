const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.recipes.index)
// router.get('/search', ctrl.recipes.search)
router.get('/:id', ctrl.recipes.show)
router.post('/', ctrl.recipes.create)
router.put('/:id', ctrl.recipes.update)
router.delete('/:id', ctrl.recipes.destroy)
router.post('/:id/ingredients', ctrl.recipes.ingredients)
router.put('/:id/ingredients/:ingredientId', ctrl.recipes.updateIngredient)
router.delete('/:id/ingredients/:ingredientId', ctrl.recipes.destroyIngredient)

// exports
module.exports = router