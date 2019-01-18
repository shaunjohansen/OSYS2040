const createError = require('http-errors')
const express = require('express')
const router = express.Router()
const DataUtil = require('../utils/DataUtil')
const cookie = require('cookie')

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in')
})

router.post('/sign-in', (req, res, next) => {
  const userId = req.body.userId
  if (!userId) {
    return next(createError(401, 'missing userId'))
  }
  const password = req.body.password
  if (!password) {
    return next(createError(401, 'missing password'))
  }

  const users = DataUtil.readUsers()
  const user = users[userId]
  if (!user) {
    return next(createError(401, `no user with handle ${userId}`))
  }
  if (user.password !== password) {
    return next(createError(401, 'incorrect password'))
  }

  setSignedInCookie(res, userId)
  res.redirect('/')
})

function setSignedInCookie(res, userId) {
  res.setHeader('Set-Cookie', cookie.serialize('userId', userId, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    sameSite: 'strict',
    path: '/',
  }))
}

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up')
})

router.post('/sign-up', (req, res, next) => {
  const userId = req.body.userId
  if (!userId) {
    return next(createError(401, 'missing userId'))
  }
  const password = req.body.password
  if (!password) {
    return next(createError(401, 'missing password'))
  }

  const users = DataUtil.readUsers()
  const user = users[userId]
  if (user) {
    return next(createError(409, `user with handle ${userId} already exists`))
  }

  users[userId] = req.body
  DataUtil.writeUsers(users)

  setSignedInCookie(res, userId)
  res.redirect('/')
})

router.get('/sign-out', (req, res, next) => {
  res.setHeader('Set-Cookie', cookie.serialize('userId', ' ', {
    httpOnly: true,
    maxAge: 0, // expire immediately
    path: '/',
  }))

  res.redirect('/')
})

module.exports = router
