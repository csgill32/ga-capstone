const router = require('express').Router()
const ctrl = require('../controllers')

const authRequired = require("../middleware/authRequired");

// routes
router.get('/', authRequired, ctrl.recipes.index)
// router.get('/search', ctrl.recipes.search)
router.get('/:id', authRequired, ctrl.recipes.show)
router.post('/', authRequired, ctrl.recipes.create)
router.put('/:id', authRequired, ctrl.recipes.update)
router.delete('/:id', authRequired, ctrl.recipes.destroy)
router.post('/:id/ingredients', authRequired, ctrl.recipes.ingredients)
router.put('/:id/ingredients/:ingredientId', authRequired, ctrl.recipes.updateIngredient)
router.delete('/:id/ingredients/:ingredientId', authRequired, ctrl.recipes.destroyIngredient)

// exports
module.exports = router