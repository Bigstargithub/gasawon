const { Router } = require('express')
const router = Router()
const ctrl = require('./ctrl.public')

router.get('/', ctrl.get_main)

router.get('/category/:id', ctrl.get_category)

module.exports = router