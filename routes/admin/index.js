const { Router } = require('express')
const router = Router()
const ctrlAdmin = require('./ctrl.admin')

const is_login = (req, res, next) => {
  if(req.session.admin_login === 'OK')
  {
    return next()
  }
  else
  {
    return res.redirect('/admin/login')
  }
}

router.get('/',ctrlAdmin.get_admin_main)

router.get('/login',ctrlAdmin.get_admin_login)
router.post('/login', ctrlAdmin.post_admin_login)

router.get('/user', ctrlAdmin.get_admin_user)

router.get('/user/detail/:id', ctrlAdmin.get_admin_user_detail)
router.post('/user/detail/:id', ctrlAdmin.post_admin_user_detail)

router.get('/user/regist', ctrlAdmin.get_admin_user_regist)

module.exports = router