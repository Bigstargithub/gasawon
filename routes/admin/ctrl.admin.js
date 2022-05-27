const models = require('../../models')
const url = require('url')
const queryString = require('node:querystring')
const sequelize = require('sequelize')

exports.get_admin_main = async (req, res) => {
  return res.render('admin/main', {
    
  })
}

exports.get_admin_login = async (req, res) => {
  return res.render('admin/login', {

  })
}

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

exports.get_admin_user = async (req, res) => {
  const seq = url.parse(req.url, true).query.seq === undefined ? 1 
              : url.parse(req.url, true).query.seq

  const users = await models.gasa_user.findAll({
    attributes:{
      include: [
        [
          sequelize.literal(`(select count(*) from gasa_user)`),'count_gasa'
        ]
      ]
    },
    offset: 20 * (seq - 1),
    limit: 20
  })

  let max_num = 0
  users.forEach(user => {
    const date = new Date(user.regdt).toLocaleDateString()
    max_num = max_num > 0 ? max_num : parseInt((user.dataValues.count_gasa) / 20) + 1
    user.regdtManu = date
  })

  console.log(max_num)  
  const startPage = parseInt(((seq - 1) / 10)) * 10 + 1
  const endPage = (parseInt(((seq - 1) / 10)) + 1) * 10 >= max_num ? max_num : (parseInt(((seq - 1) / 10)) + 1) * 10


  return res.render('admin/user_list',{
    users,
    startPage,
    endPage,
    seq,
    max_num
  })
}

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

exports.get_admin_user_regist = async (req, res) => {
  return res.render('admin/user_regist', {

  })
}