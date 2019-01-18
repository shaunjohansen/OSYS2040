module.exports = (req, res, next) => {
  res.locals.signedInAs = req.cookies.userId
  console.log('res.locals.signedInAs', res.locals.signedInAs)

  next()
}