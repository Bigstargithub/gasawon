const models = require('../../models')
const db = require('../../models')
const url = require('url')
const queryString = require('node:querystring')
const sequelize = require('sequelize')
const fs = require('fs')
const csv = require('csv-parser')
const crypto = require('crypto')
const { Op, QueryTypes } = require('sequelize')

// 메인페이지
exports.get_admin_main = async (req, res) => {
  return res.render('admin/main', {
    
  })
}

// 관리자 로그인페이지
exports.get_admin_login = async (req, res) => {
  return res.render('admin/login', {

  })
}

// 관리자 로그인
exports.post_admin_login = async (req, res) => {
  const { id, pw } = req.body
  if(id === process.env.ADMIN_ID && pw === process.env.ADMIN_PW)
  {
    req.session.admin_login = 'OK'
    return res.send('success')
  }
  else
  {
    return res.send('fail')
  }
}

// 회원관리 리스트
exports.get_admin_user = async (req, res) => {
  const seq = url.parse(req.url, true).query.seq === undefined ? 1 
              : url.parse(req.url, true).query.seq
  const userId = url.parse(req.url, true).query.id === undefined ? '' :
                url.parse(req.url, true).query.id


  let max_num = await models.gasa_user.count({
    where:{
      guid:{
        [Op.like]: `%${userId}%`
      }
    }
  })

  const users = await models.gasa_user.findAll({
    where: {
      guid: {
        [Op.like]: `%${userId}%`
      },
    },
    offset: 20 * (seq - 1),
    limit: 20
  })

  max_num = parseInt((max_num) / 20) + 1

  users.forEach(user => {
    const date = new Date(user.regdt).toLocaleDateString()   
    user.regdtManu = date
  })

  const startPage = parseInt(((seq - 1) / 10)) * 10 + 1
  const endPage = (parseInt(((seq - 1) / 10)) + 1) * 10 >= max_num ? max_num : (parseInt(((seq - 1) / 10)) + 1) * 10


  return res.render('admin/user_list',{
    users,
    startPage,
    endPage,
    seq,
    max_num,
    userId
  })
}

// 회원정보 수정
exports.get_admin_user_detail = async (req, res) => {
  const seq = req.params.id
  
  const user = await models.gasa_user.findOne({
    where:{
      guseq: seq
    },
    limit:1
  })

  if(user === null)
  {
    return res.send("<script>alert('잘못된 회원입니다.');location.href = '/admin/user';</script>")
  }

  let date = new Date(user.regdt) 
  date = date.toLocaleDateString()

  return res.render('admin/user_detail', {
    user,
    date
  })
}

// 회원정보 업데이트
exports.post_admin_user_detail = async (req, res) => {
  const { seq, name, mobile, email } = req.body
  models.gasa_user.update({
    guname: name,
    guemail: email,
    guphone: mobile,
  }, {
    where:
    {
      guseq: seq
    }
  })
  .then(() => {
    return res.send('Y')
  })
  .catch(() => {
    return res.send('N')
  })
}

// 회원등록 페이지
exports.get_admin_user_regist = async (req, res) => {
  return res.render('admin/user_regist', {

  })
}

// 회원등록
exports.post_admin_user_regist = async(req, res) => {
  const { gufile } = req.body;
  const result = []
  fs.createReadStream(`uploads/user/gumember_regist.csv`)
  .pipe(csv())
  .on('data', (data) => result.push(data))
  .on('end', () => {
    result.map(data => {
      const phoneNo = data[Object.keys(data)[4]].replaceAll(/-/g, '')

      const cryptoKey = crypto.createCipher('aes-256-gcm',process.env.DB_ENCRYPT_KEY);
      let passwdWithCrypto = cryptoKey.update(data[Object.keys(data)[1]],'utf8', 'base64')
      passwdWithCrypto += cryptoKey.final('base64')

      models.gasa_user.create({
        guid: data[Object.keys(data)[0]],
        gupass: passwdWithCrypto,
        guname: data[Object.keys(data)[2]],
        guemail: data[Object.keys(data)[3]],
        guphone: phoneNo
      })
    })
  })

  return res.send("<script>alert('저장이 완료되었습니다.');location.href='/admin/user';</script>")
}

// 카테고리 관리
exports.get_admin_category = async (req, res) => {
  const seq = url.parse(req.url, true).query.seq === undefined ? 1 
              : url.parse(req.url, true).query.seq
  
  const category = await models.gasa_category.findAll({
    offset: 20 * (seq - 1),
    limit: 20
  })

  

  category.forEach(cate => {
    const date = new Date(cate.regdt)
    cate.regdtConvert = date.toLocaleDateString()
  })

  let max_num = await models.gasa_category.count({

  })

  max_num = parseInt((max_num) / 20) + 1

  const startPage = parseInt((seq - 1) / 10) * 10 + 1
  const endPage = ((parseInt(seq -1) / 10) + 1) * 10 > max_num ? max_num
    :  (parseInt(((seq - 1) / 10)) + 1) * 10

  

  return res.render('admin/category_list', {
    category,
    max_num,
    seq,
    startPage,
    endPage
  })
}

// 카테고리 등록 페이지
exports.get_admin_category_regist = async (req, res) => {
  return res.render('admin/category_regist', {

  })
}

// 카테고리 등록
exports.post_admin_category_regist = async (req, res) => {
  const { name, show_yn } = req.body
  models.gasa_category.create({
    gcname: name,
    gcshow_yn : show_yn,
  })
  .then(() => {
    return res.send(`<script>alert('저장되었습니다.');
                    location.href='/admin/category'</script>`)
  })
  .catch((error) => {
    return console.error(error)
  })
}

// 카테고리 수정 페이지
exports.get_admin_category_modify = async (req, res) => {
  const seq = req.params.seq

  const category = await models.gasa_category.findOne({
    where: {
      gcseq: seq
    }
  })

  return res.render('admin/category_modify', {
    cate: category,
  })
}

// 카테고리 수정
exports.post_admin_category_modify = async (req, res) => {
  const { name, show_yn } = req.body
  const seq = req.params.seq
  
  models.gasa_category.update({
    gcname: name,
    gcshow_yn: show_yn
  },{
    where: {
      gcseq: seq
    }
  })
  .then(() => {
    return res.send(`<script>
      alert("저장되었습니다.")
      location.href = '/admin/category'
    </script>`)
  })
  .catch((err) => {
    console.error(err)
  })
}

// 카테고리 삭제
exports.delete_admin_category = async (req, res) => {
  const seq = req.params.seq
  models.gasa_category.destroy({
    where: {
      gcseq: seq
    }
  })
  .then(() => {
    res.send('Y')
  })
  .catch((error) => {
    console.error(error)
  })
}

// 카테고리 클래스 등록 페이지
exports.get_admin_category_class = async (req, res) => {
  const seq = req.params.seq
  const searchText = url.parse(req.url, true).query.title === undefined ? "" : 
    url.parse(req.url, true).query.title

  const [categoryClassList] = await db.sequelize.query(`
    select
      a.regdt,
      a.gccseq,
      b.gcl_name
    from gasa_category_class as a
    inner join gasa_class as b
    on a.gclseq = b.gclseq
    where
      a.gcseq = ${seq}
  `)

  categoryClassList.forEach((ccl) => {
    ccl.regdt = new Date(ccl.regdt).toLocaleString()
  })

  const [classList] = await db.sequelize.query(`
    select 
      a.*,
      case when 
        a.gclseq = (select gclseq from gasa_category_class where gcseq = ${seq} and gclseq = a.gclseq) 
      then 'Y'
      else 'N' end as isCategoryClass
    from gasa_class as a
    where
      a.gcl_name like '%${searchText}%'
  `)

  return res.render('admin/category_class_list', {
    categoryClassList,
    searchText,
    classList,
    seq
  })
}

// 카테고리 클래스 등록
exports.post_admin_category_class = async (req, res) => {
  const seq = req.params.seq
  const { classSeq } = req.body

  models.gasa_category_class.create({
    gcseq: seq,
    gclseq: classSeq
  })
  .then(() => {
    return res.send('Y')
  })
  .catch(() => {
    return res.send('N')
  })
}

//카테고리 클래스 삭제
exports.delete_admin_category_class = async (req, res) => {
  const seq = req.params.seq

  models.gasa_category_class.destroy({
    where:
    {
      gccseq: seq
    }
  })
  .then(() => {
    return res.send('Y')
  })
  .catch((err) => {
    return console.error(err)
  })
}

// 클래스 영상 등록 페이지
exports.get_admin_class_video = async (req, res) => {
  const seq = req.params.seq
  const searchText = url.parse(req.url, true).query.title === undefined ? "" : 
    url.parse(req.url, true).query.title

  const [classVideoList] = await db.sequelize.query(`
    select 
      a.gclvseq,
      a.regdt,
      b.gcv_name
    from gasa_class_video as a
    inner join gasa_video as b on a.gcvseq = b.gcvseq
    where
      a.gclseq = ${seq}
  `)

  classVideoList.forEach((cvl) => {
    cvl.regdt = new Date(cvl.regdt).toLocaleString()
  })

  const [videoList] = await db.sequelize.query(`
    select
    a.*,
    case when a.gcvseq = 
      (select gcvseq from gasa_class_video where gclseq = ${seq} and gcvseq = a.gcvseq)
    then 'Y' else 'N' end as isClassVideo
    from gasa_video as a
  `)

  return res.render('admin/class_video_list', {
    classVideoList,
    searchText,
    videoList,
    seq
  })
}

// 클래스 영상 등록
exports.post_admin_class_video = async (req, res) => {
  const seq = req.params.seq
  const { videoSeq } = req.body

  models.gasa_class_video.create({
    gclseq: seq,
    gcvseq: videoSeq
  })
  .then(() => {
    return res.send('Y')
  })
  .catch((err) => {
    return console.error(err)
  })
}

// 클래스 영상 삭제
exports.delete_admin_class_video = async (req, res) => {
  const seq = req.params.seq

  models.gasa_class_video.destroy({
    where: {
      gclvseq: seq
    }
  })
  .then(() => {
    return res.send('Y')
  })
  .catch((err) => {
    return console.error(err)
  })
}

// 클래스 리스트
exports.get_admin_class = async (req, res) => {
  const seq = url.parse(req.url, true).query.seq === undefined ? 1 
              : url.parse(req.url, true).query.seq

  const classes = await models.gasa_class.findAll({
    offset: 20 * (seq - 1),
    limit: 20
  })

  return res.render('admin/class_list', {
    classes,
    seq
  })
}

// 클래스 등록 페이지
exports.get_admin_class_regist = async (req, res) => {
  return res.render('admin/class_regist', {
    
  })
}

// 클래스 등록
exports.post_admin_class_regist = async (req, res) => {
  const {
    class_name,
    class_teacher,
    show_yn,
    opn_d,
    opn_t
  } = req.body

  const classThumb = req.file === undefined ? "" : req.file.originalname

  models.gasa_class.create({
    gcl_name: class_name,
    gcl_tc_name: class_teacher,
    gcl_show_yn: show_yn,
    gcl_opn_d: opn_d,
    gcl_opn_t: opn_t,
    gcl_thumb: classThumb
  })
  .then(() => {
    return res.send(`
      <script>
        alert("저장되었습니다.")
        location.href = '/admin/class'
      </script>
    `)
  })
  .catch((err) => {
    console.error(err)
  })
}

// 클래스 삭제
exports.delete_admin_class = async (req, res) => {
  const seq = req.params.seq

  models.gasa_class.destroy({
    where: {
      gclseq: seq
    }
  })
  .then(() => {
    return res.send('Y')
  })
  .catch((err) => {
    console.error(err)
  })
}

// 클래스 수정 페이지
exports.get_admin_class_modify = async (req, res) => {
  const seq = req.params.seq
  const gasaClass = await models.gasa_class.findOne({
    where: {
      gclseq: seq
    }
  })

  return res.render("admin/class_modify", {
    gasaClass,
  })
}

// 클래스 수정
exports.update_admin_class = async (req, res) => {
  const seq = req.params.seq

  const updateClass = await models.gasa_class.findOne({
    where: {
      gclseq: seq
    }
  })

  const {
    class_name,
    class_teacher,
    show_yn,
    opn_d,
    opn_t
  } = req.body

  const classThumb = req.file === undefined ? "" : req.file.originalname

  const modifyObj = {
    gcl_name: class_name,
    gcl_tc_name: class_teacher,
    gcl_show_yn: show_yn,
    gcl_opn_d: opn_d,
    gcl_opn_t: opn_t,
  }

  if (classThumb > "")
  {
    if(updateClass.gcl_thumb > "" && fs.existsSync(`uploads/class_thum/${updateClass.gcl_thumb}`))
    {
      fs.unlink(`uploads/class_thumb/${updateClass.gcl_thumb}`, function (err) {
        console.error(err)
      })
    }
    modifyObj.gcl_thumb = classThumb
  }
  
  console.log(modifyObj)

  models.gasa_class.update(modifyObj, {
    where: {
      gclseq: seq
    }
  })
  .then(() => {
    return res.send(`
      <script>
        alert('수정되었습니다.')
        location.href = '/admin/class/modify/${seq}'
      </script>
    `)
  })
  .catch((err) => {
    console.error(err)
  })
}

// 영상관리
exports.get_admin_video = async (req, res) => {
  const seq = url.parse(req.url, true).query.seq === undefined ? 1 
              : url.parse(req.url, true).query.seq

  const classes = await models.gasa_video.findAll({
    offset: 20 * (seq - 1),
    limit: 20
  })

  return res.render('admin/video_list', {
    classes
  })
}

// 영상등록 페이지
exports.get_admin_video_regist = async (req, res) => {
  return res.render('admin/video_regist', {
    
  })
}

// 영상 등록
exports.post_admin_video_regist = async (req, res) => {
  const {
    video_name,
    video_teacher,
    show_yn,
    vimeo_key
  } = req.body

  const thumbFile = req.file === undefined ? "" : req.file.originalname

  models.gasa_video.create({
    gcv_name: video_name,
    gcv_tc_name: video_teacher,
    gcv_show_yn: show_yn,
    gcv_thumb: thumbFile,
    gcv_vimeo_key: vimeo_key
  })
  .then(() => {
    return res.send(`
      <script>
        alert("저장되었습니다.")
        location.href = '/admin/video'
      </script>
    `)
  })
  .catch((err) => {
    console.error(err)
  })
}

// 영상 수정 페이지
exports.get_admin_video_modify = async (req, res) => {
  const seq = req.params.seq

  const video = await models.gasa_video.findOne({
    where: {
      gcvseq: seq
    }
  })

  return res.render('admin/video_modify.html', {
    video,
  })
}

// 영상 수정
exports.post_admin_video_modify = async (req, res) => {
  const seq = req.params.seq

  const video = await models.gasa_video.findOne({
    where: {
      gcvseq: seq
    }
  })
  
  const {
    video_name,
    video_teacher,
    show_yn,
    vimeo_key
  } = req.body

  const thumbFile = req.file === undefined ? "" : req.file.originalname
  const modifyObj = {
    gcv_name: video_name,
    gcv_tc_name: video_teacher,
    gcv_show_yn: show_yn,
    gcv_vimeo_key: vimeo_key
  }

  if(thumbFile > "")
  {
    fs.unlink(`uploads/class_thumb/${video.gcv_thumb}`, function(err) {
      console.error(err)
    })
    modifyObj.gcv_thumb = thumbFile
  }

  models.gasa_video.update(modifyObj, {
    where: {
      gcvseq: seq
    }
  })
  .then(() => {
    return res.send(`
      <script>
        alert("저장되었습니다.")
        location.href = '/admin/video'
      </script>
    `)
  })
  .catch((err) => {
    console.error(err)
  })
}