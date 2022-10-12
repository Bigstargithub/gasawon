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

const classThumbMulter = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/class_thumb/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const videoThumbMulter = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/video_thumb/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})



const userFile = multer({ storage: userFileMulter })
const videoThumbFile = multer({ storage: videoThumbMulter })
const classThumbFile = multer({ storage: classThumbMulter })

router.get('/',is_login,ctrlAdmin.get_admin_main)

// 관리자 로그인
router.get('/login',ctrlAdmin.get_admin_login)
router.post('/login', ctrlAdmin.post_admin_login)

// 회원 관리
router.get('/user',ctrlAdmin.get_admin_user)
router.get('/user/detail/:id',ctrlAdmin.get_admin_user_detail)
router.post('/user/detail/:id', ctrlAdmin.post_admin_user_detail)
router.get('/user/regist',ctrlAdmin.get_admin_user_regist)
router.post('/user/regist', userFile.single('gufile'), ctrlAdmin.post_admin_user_regist)
router.post('/user/reset/:id', ctrlAdmin.post_admin_user_reset)
router.get('/user/group', ctrlAdmin.get_admin_user_group)
router.post('/user/group', ctrlAdmin.post_admin_user_group)
router.delete('/user/group/:seq', ctrlAdmin.delete_admin_user_group)
router.get('/user/group/detail/:name', ctrlAdmin.get_admin_user_group_detail)

// 카테고리 관리
router.get('/category', ctrlAdmin.get_admin_category)
router.get('/category/regist', ctrlAdmin.get_admin_category_regist)
router.post('/category/regist', ctrlAdmin.post_admin_category_regist)
router.get('/category/modify/:seq', ctrlAdmin.get_admin_category_modify)
router.post('/category/modify/:seq', ctrlAdmin.post_admin_category_modify)
router.delete('/category/delete/:seq', ctrlAdmin.delete_admin_category)

// 카테고리 클래스 등록 관련 Router
router.get('/category/class/:seq', ctrlAdmin.get_admin_category_class)
router.post('/category/class/:seq', ctrlAdmin.post_admin_category_class)
router.delete('/category/class/:seq', ctrlAdmin.delete_admin_category_class)
router.post('/category/class/order/:seq', ctrlAdmin.post_admin_category_class_order)

// 클래스 영상 등록
router.get('/class/video/:seq', ctrlAdmin.get_admin_class_video)
router.post('/class/video/:seq', ctrlAdmin.post_admin_class_video)
router.delete('/class/video/:seq', ctrlAdmin.delete_admin_class_video)
router.post('/class/video/order/:seq', ctrlAdmin.post_admin_class_video_order)

// 클래스 관리
router.get("/class", ctrlAdmin.get_admin_class)
router.get("/class/regist", ctrlAdmin.get_admin_class_regist)
router.post("/class/regist", classThumbFile.single('class_thumb'),
  ctrlAdmin.post_admin_class_regist)
router.delete("/class/delete/:seq", ctrlAdmin.delete_admin_class)
router.get("/class/modify/:seq", ctrlAdmin.get_admin_class_modify)
router.post("/class/modify/:seq", classThumbFile.single('class_thumb'),
  ctrlAdmin.update_admin_class)

// 클래스 회원 권한
router.get("/class/user/:seq", ctrlAdmin.get_admin_class_user)
router.post("/class/user", ctrlAdmin.post_admin_class_user)
router.post("/class/user/delete", ctrlAdmin.delete_admin_class_user)
router.get("/class/user/history/:seq", ctrlAdmin.get_admin_class_user_history)
router.post("/class/user/all", ctrlAdmin.post_admin_class_user_all)



// 영상 관리
router.get('/video', ctrlAdmin.get_admin_video)
router.get('/video/regist',ctrlAdmin.get_admin_video_regist)
router.post('/video/regist', videoThumbFile.single('video_thumb'), 
  ctrlAdmin.post_admin_video_regist)
router.get('/video/modify/:seq', ctrlAdmin.get_admin_video_modify)
router.post('/video/modify/:seq', videoThumbFile.single('video_thumb'),
  ctrlAdmin.post_admin_video_modify)



module.exports = router