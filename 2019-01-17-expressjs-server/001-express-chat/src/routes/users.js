const express = require('express')
const router = express.Router()
const DataUtil = require('../utils/DataUtil')

/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = DataUtil.readUsers()
  const userIds = Object.keys(users)
  res.render('users', { users, userIds })
})

module.exports = router
