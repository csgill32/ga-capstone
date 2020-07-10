const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.recipes.index)
router.get('/:id', ctrl.recipes.show)
router.post('/', ctrl.recipes.create)
router.put('/:id', ctrl.recipes.update)
router.delete('/:id', ctrl.recipes.destroy)

// exports
module.exports = router