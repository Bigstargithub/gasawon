const models = require("../../models")
const db = require("../../models")
const crypto = require('crypto')
const { Op } = require('sequelize')
const url = require('url')

exports.get_main = async (req, res) => {
  let userName 
  if(req.session.login !== undefined)
  {
    [userName] = await models.gasa_user.findAll({
      where: {
        guid: req.session.login
      }
    })
  }

  userName = userName === undefined ? "" : userName.dataValues

  const [lifeSeq] = await models.gasa_class.findAll({
    where: {
      gcl_name: '환영사'
    }
  })

  const [openAndClose] = await models.gasa_class.findAll({
    where: {
      gcl_name: '개·폐회사'
    }
  })

  const [exampleSeq] = await models.gasa_class.findAll({
    where: {
      gcl_name: '사례발표'
    }
  })

  return res.render('main',{
    userName,
    lifeSeq,
    openAndClose,
    exampleSeq
  })
}

exports.get_category = async (req, res) => {
  const classId = url.parse(req.url, true).query.name === undefined ? '' :
    url.parse(req.url, true).query.name
  let userName
  if(req.session.login !== undefined)
  {
    [userName] = await models.gasa_user.findAll({
      where: {
        guid: req.session.login
      }
    })
  }

  userName = userName === undefined ? "" : userName.dataValues

  let classList = []
  if(classId === '')
  {
    classList = await models.gasa_class.findAll({
      where: {
        gcl_opn_d:
        {
          [Op.lte]: new Date() 
        }
      }
    })
  }
  else
  {
    [classList] = await db.sequelize.query(`
      select
        a.*
      from gasa_class as a
      left join gasa_category_class as b
      on a.gclseq = b.gclseq
      where
        a.gcl_opn_d >= curdate()
        and b.gcseq = (select gcseq from gasa_category where gcname = '${classId}')
    `)
  }
  


  const [lifeSeq] = await models.gasa_class.findAll({
    where: {
      gcl_name: '환영사'
    }
  })

  const [openAndClose] = await models.gasa_class.findAll({
    where: {
      gcl_name: '개·폐회사'
    }
  })

  const [exampleSeq] = await models.gasa_class.findAll({
    where: {
      gcl_name: '사례발표'
    }
  })

  return res.render('category', {
    userName,
    classList,
    lifeSeq,
    openAndClose,
    exampleSeq
  })
}

exports.get_category_with_id = async (req, res) => {
  return res.render('category', {

  })
}

exports.get_login = async (req, res) => {
  let userName = ""

  const [lifeSeq] = await models.gasa_class.findAll({
    where: {
      gcl_name: '환영사'
    }
  })

  const [openAndClose] = await models.gasa_class.findAll({
    where: {
      gcl_name: '개·폐회사'
    }
  })

  const [exampleSeq] = await models.gasa_class.findAll({
    where: {
      gcl_name: '사례발표'
    }
  })

  return res.render('login', {
    userName,
    lifeSeq,
    openAndClose,
    exampleSeq
  })
}

exports.post_login = async (req, res) => {
  const { Id, Pw } = req.body

  const [user] = await db.sequelize.query(`
    select
      *,
      case when 
        gupass = aes_encrypt('${Pw}', '${process.env.DB_ENCRYPT_KEY}')
        then 'Y' else 'N' 
        end as isSamePw
    from gasa_user
    where
      guid = '${Id}'
    limit 1
  `)

  if (!user || user.length === 0) return res.send("N")

  if (user[0].isSamePw === 'N') return res.send("N")
  
  req.session.login = Id

  return res.send("Y")
}

exports.post_logout = async (req, res) => {
  req.session.login = ""

  return res.send("Y")
}


exports.get_detail = async (req, res) => {
  let userName
  if(req.session.login !== undefined)
  {
    [userName] = await models.gasa_user.findAll({
      where: {
        guid: req.session.login
      }
    })
  }

  userName = userName === undefined ? "" : userName.dataValues

  const id = req.params.id

  const [classList] = await models.gasa_class.findAll({
    where: {
      gclseq: id
    }
  })

  const [lifeSeq] = await models.gasa_class.findAll({
    where: {
      gcl_name: '환영사'
    }
  })

  const [openAndClose] = await models.gasa_class.findAll({
    where: {
      gcl_name: '개·폐회사'
    }
  })

  const [exampleSeq] = await models.gasa_class.findAll({
    where: {
      gcl_name: '사례발표'
    }
  })

  let classUser
  if(req.session.login !== undefined)
  {
    [classUser] = await models.gasa_class_user.findAll({
      where:{
        guseq: userName.guseq,
        gclseq: id
      }
    });
  }
  
  const isClassUser = classUser === undefined ? "N" : "Y"

  return res.render('detail', {
    classList,
    userName,
    lifeSeq,
    openAndClose,
    exampleSeq,
    isClassUser
  })
}

exports.get_class_view = async (req, res) => {
  let userName 
  if(req.session.login !== undefined)
  {
    [userName] = await models.gasa_user.findAll({
      where: {
        guid: req.session.login
      }
    })
  }

  userName = userName === undefined ? "" : userName.dataValues

  const id = req.params.id

  const classList = await models.gasa_class.findOne({
    where: {
      gclseq: id
    }
  })

  const [videoList] = await db.sequelize.query(`
    select
      a.*
    from gasa_video as a
    inner join gasa_class_video as b
    on a.gcvseq = b.gcvseq
    where
      b.gclseq = ${id}
  `)
  const [lifeSeq] = await models.gasa_class.findAll({
    where: {
      gcl_name: '환영사'
    }
  })

  const [openAndClose] = await models.gasa_class.findAll({
    where: {
      gcl_name: '개·폐회사'
    }
  })

  const [exampleSeq] = await models.gasa_class.findAll({
    where: {
      gcl_name: '사례발표'
    }
  })
  

  return res.render("class_view.html", {
    classList,
    videoList,
    userName,
    lifeSeq,
    openAndClose,
    exampleSeq
  })
}