const express = require('express')
const {
    validateActionId,
    validateAction,
    validateExistingId
} = require('./actions-middlware')

const Action = require('./actions-model')
const router = express.Router()

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Action.insert({project_id: req.project_id, description: req.description, notes: req.notes, completed: req.completed})
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateAction, validateExistingId, (req, res, next) => {
    Action.update(req.params.id, {project_id: req.project_id, description: req.description, notes: req.notes})
        .then(() => {
            return Action.get(req.params.id)
        })
        .then(updatedAction => {
            res.json(updatedAction)
        })
        .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id)
        res.json(req.action)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: 'sowwy something twagic happened owo',
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router