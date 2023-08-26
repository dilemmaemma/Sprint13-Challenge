const Action = require('./actions-model')

function logger(req, res, next) {
    const timeStamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timeStamp}] ${method} to ${url}`)
    next()
}

async function validateActionId (req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if (!action) {
          next({status: 404, message: 'action not found'})
        } else {
          req.action = action
          next()
        }
      } catch (err) {
        res.status(404).json({
          message: 'problem finding action'
        })
      }
}

module.exports = {
    logger,
    validateActionId
}