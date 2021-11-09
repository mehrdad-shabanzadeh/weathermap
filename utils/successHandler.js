module.exports = (res, status, result, info) => {
  return res.status(status).send(result)
}