const { Router } = require('express')
const router = Router()

router.use('/', require('./public'))

router.use('/admin', require('./admin'))

module.exports = router