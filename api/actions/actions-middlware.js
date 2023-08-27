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

function validateAction(req, res, next) {
    Action.get()
        .then(id => {
            const { project_id, description, notes, completed } = req.body
            if(!id.includes(project_id)) {
                res.status(400).json({
                    message: 'project id must correspond with existing project'
                })
            } else {
                if (!project_id && !description && !notes) {
                    res.status(400).json({
                        message: 'missing required project id, description, and notes fields'
                    })
                } else if (!project_id || !project_id.trim()) {
                    res.status(400).json({
                        message: 'missing required project id field'
                    })
                } else if (!description) {
                    res.status(400).json({
                        message: 'missing required description field'
                    })
                } else if (!notes) {
                    res.status(400).json({
                        message: 'missing required notes field'
                    })
                } else if (description.length > 128) {
                    res.status(400).json({
                        message: 'description must be 128 characters or less'
                    })
                } else {
                    req.project_id = project_id.trim()
                    req.description = description
                    req.notes = notes
                    req.completed = completed
                    next()
                }
            }
        })
        .catch (err => {
            res.status(400).json({
                message: err.message,
                stack: err.stack
            })
        })
}

module.exports = {
    logger,
    validateActionId,
    validateAction,

}