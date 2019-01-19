var express = require('express')
var DataUtil = require('../utils/DataUtil')

var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  var users = DataUtil.readUsers()
  var userIds = Object.keys(users)
  res.render('users', {
    users: users,
    userIds: userIds,
  })
})

module.exports = router
