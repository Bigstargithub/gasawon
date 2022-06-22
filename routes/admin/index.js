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

// 클래스 관리
router.get("/class", ctrlAdmin.get_admin_class)
router.get("/class/regist", ctrlAdmin.get_admin_class_regist)
router.post("/class/regist", classThumbFile.single('class_thumb'),
              ctrlAdmin.post_admin_class_regist)
router.delete("/class/delete/:seq", ctrlAdmin.delete_admin_class)
router.get("/class/detail/:seq", ctrlAdmin.get_admin_class_modify)


// 영상 관리
router.get('/video', ctrlAdmin.get_admin_video)
router.get('/video/regist', ctrlAdmin.get_admin_video_regist)
router.post('/video/regist', videoThumbFile.single('video_thumb'), 
            ctrlAdmin.post_admin_video_regist)
router.get('/video/modify/:seq', ctrlAdmin.get_admin_video_modify)
router.post('/video/modify/:seq', videoThumbFile.single('video_thumb') ,ctrlAdmin.post_admin_video_modify)



module.exports = router