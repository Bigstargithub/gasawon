const models = require('../../models')
const url = require('url')
const queryString = require('node:querystring')

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
  const seq = url.parse(req.url, true).query.seq === undefined ? 0 
              : url.parse(req.url, true).query.seq

  const users = await models.gasa_user.findAll({
    offset: 20 * seq,
    limit: 20
  })
  
  
  return res.render('admin/user_list',{
    users,
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

  let date = new Date(user.regdt) 
  date = date.toLocaleDateString()

  return res.render('admin/user_detail', {
    user,
    date
  })
}