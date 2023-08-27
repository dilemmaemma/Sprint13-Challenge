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
    const { project_id, description, notes, completed } = req.body;

    if (!project_id || !description || !notes) {
        res.status(400).json({
            message: 'missing required fields'
        });
    } else if (description.length > 128) {
        res.status(400).json({
            message: 'description must be 128 characters or less'
        });
    } else if (completed !== true && completed !== false) {
        res.status(400).json({
            message: 'Missing completed property'
        });
    } else {
        req.project_id = project_id;
        req.description = description;
        req.notes = notes;
        req.completed = completed;
        next();
    }
}

async function validateExistingId(req, res, next) {
    const { project_id } = req.body;

    try {
        const action = await Action.get(req.params.id);
        if (!action || action.id !== project_id) {
            return res.status(400).json({
                message: 'project id must correspond with existing id'
            });
        }
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    logger,
    validateActionId,
    validateAction,
    validateExistingId
}