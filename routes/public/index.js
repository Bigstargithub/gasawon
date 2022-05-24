const { Router } = require('express')
const router = Router()
const ctrl = require('./ctrl.public')

router.get('/', ctrl.get_main)

router.get('/category', ctrl.get_category)

router.get('/category/:id', ctrl.get_category_with_id)

router.get('/login', ctrl.get_login)

router.get('/detail/:id', ctrl.get_detail)

module.exports = router