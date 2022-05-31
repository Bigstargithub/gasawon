const { Router } = require('express')
const router = Router()
const ctrlAdmin = require('./ctrl.admin')
const multer = require('multer')

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

const userFileMulter = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/user/')
  },
  filename: function(req, file, cb)
  {
    cb(null, 'gumember_regist.csv')
  }
})

const userFile = multer({storage: userFileMulter})

router.get('/',ctrlAdmin.get_admin_main)

// 관리자 로그인
router.get('/login',ctrlAdmin.get_admin_login)
router.post('/login', ctrlAdmin.post_admin_login)

// 회원 관리
router.get('/user', ctrlAdmin.get_admin_user)
router.get('/user/detail/:id', ctrlAdmin.get_admin_user_detail)
router.post('/user/detail/:id', ctrlAdmin.post_admin_user_detail)
router.get('/user/regist', ctrlAdmin.get_admin_user_regist)
router.post('/user/regist', userFile.single('gufile'), ctrlAdmin.post_admin_user_regist)

// 카테고리 관리
router.get('/category', ctrlAdmin.get_admin_category)
router.get('/category/regist', ctrlAdmin.get_admin_category_regist)
router.post('/category/regist', ctrlAdmin.post_admin_category_regist)
router.get('/category/modify/:seq', ctrlAdmin.get_admin_category_modify)
router.post('/category/modify/:seq', ctrlAdmin.post_admin_category_modify)
router.delete('/category/delete/:seq', ctrlAdmin.delete_admin_category)

// 영상 관리
router.get('/video', ctrlAdmin.get_admin_video)

module.exports = router