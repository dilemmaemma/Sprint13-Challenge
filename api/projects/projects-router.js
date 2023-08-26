const express = require('express')
const {
    validateProjectId,
} = require('./projects-middleware')

const Project = require('./projects-model')
const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res, next) => {
    req.json(req.project)
})

router.post('/', (req, res, next) => {

})

router.put('/:id', validateProjectId, (req, res, next) => [

])

router.delete('/:id', validateProjectId, (req, res, next) => {

})

router.get('/:id/actions', validateProjectId, (req, res, next) => {

})

module.exports = router