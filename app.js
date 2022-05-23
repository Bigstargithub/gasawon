const express = require('express')
const dotenv = require('dotenv')
const nunjucks = require('nunjucks')
const path = require('path')
const morgan = require('morgan')

dotenv.config()

class App
{
  constructor() {
    this.app = express()

    //미들웨어 셋팅
    this.setMiddleWare()

    //뷰 엔진 셋팅
    this.setViewEngine()

    //라우터 셋팅
    this.setRouting()

    //로컬 변수
    this.setStatic()
  }

  setMiddleWare() {
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
  }

  setViewEngine() {
    this.app.set('view engine', 'html')

    nunjucks.configure('Template', {
      autoescape: true,
      express: this.app,
      watch: true,
    })
  }

  setStatic() {
    this.app.use(express.static(path.join(__dirname, 'public')))
    this.app.use(express.static(path.join(__dirname)))
    this.app.use(express.static('public/img'))
    this.app.use(express.static('public/js'))
  }

  setRouting() {
    this.app.use(require('./routes'))
  }



}

module.exports = new App().app