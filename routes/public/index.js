const { Router } = require('express')
const router = Router()
const ctrl = require('./ctrl.public')

router.get('/', ctrl.get_main)

router.get('/login', ctrl.get_login)
router.post('/login', ctrl.post_login)
router.post('/logout', ctrl.post_logout)

router.get('/category', ctrl.get_category)
router.get('/category/:id', ctrl.get_category_with_id)

router.get('/detail/:id', ctrl.get_detail)

router.get('/class/view/:id', ctrl.get_class_view)

module.exports = router