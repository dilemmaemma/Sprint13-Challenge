const express = require('express')
const {
    validateActionId
} = require('./actions-middlware')

const Action = require('./actions-model')
const router = express.Router()

router.get('/actions', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.get('/actions/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post('/actions', (req, res, next) => {

})

router.put('/actions/:id', validateActionId, (req, res, next) => {

})

router.delete('/actions/:id', validateActionId, (req, res, next) => {

})