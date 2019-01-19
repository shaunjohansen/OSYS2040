const express = require('express')
const createError = require('http-errors')
const DataUtil = require('../utils/DataUtil')
const uuidv1 = require('uuid/v1')

const router = express.Router()

router.get('/', function(req, res, next) {
  const rooms = DataUtil.readRooms()
  const roomIds = Object.keys(rooms)
  res.render('rooms', { rooms, roomIds })
})

router.post('/create-room', function(req, res, next) {
  if (!res.locals.signedInAs) {
    return next(createError(401))
  }

  const roomName = req.body.roomName
  if (!roomName) {
    return next(createError(400, 'missing roomName'))
  }

  const rooms = DataUtil.readRooms()

  const roomId = uuidv1()
  rooms[roomId] = {
    roomId,
    createdBy: res.locals.signedInAs,
    createdAt: new Date(),
    updatedBy: res.locals.signedInAs,
    updatedAt: new Date(),
    roomName,
    messages: [],
  }
  DataUtil.writeRooms(rooms)

  res.redirect(`/chat/${roomId}`)
})

router.get('/:roomId', function(req, res, next) {
  const roomId = req.params.roomId
  if (!roomId) {
    return next(createError(400, 'missing roomId'))
  }

  const rooms = DataUtil.readRooms()
  const room = rooms[roomId]
  if (!room) {
    return next(createError(404, `no room with id ${roomId} exists`))
  }

  res.render('room', { room })
})

router.post('/:roomId/create-message', function(req, res, next) {
  const roomId = req.params.roomId
  if (!roomId) {
    return next(createError(400, 'missing roomId'))
  }

  const message = req.body.message
  if (!message) {
    return next(createError(400, 'missing message'))
  }

  const rooms = DataUtil.readRooms()
  const room = rooms[roomId]
  if (!room) {
    return next(createError(404, `no room with id ${roomId} exists`))
  }

  room.messages.push({
    createdBy: res.locals.signedInAs,
    createdAt: new Date(),
    updatedBy: res.locals.signedInAs,
    updatedAt: new Date(),

    message,
  })
  DataUtil.writeRooms(rooms)

  res.redirect(`/chat/${roomId}`)
})

module.exports = router
