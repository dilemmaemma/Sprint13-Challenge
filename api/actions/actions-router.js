const express = require('express')
const {
    validateActionId
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

router.post('/', (req, res, next) => {

})

router.put('/:id', validateActionId, (req, res, next) => {

})

router.delete('/:id', validateActionId, (req, res, next) => {

})

module.exports = router