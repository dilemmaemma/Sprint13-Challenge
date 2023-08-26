const express = require('express')
const {
    validateProjectId,
    validateProject,

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

router.post('/', validateProject, (req, res, next) => {
    Project.insert({name: req.name, description: req.description})
    .then(newProject => {
      res.status(201).json(newProject)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, (req, res, next) => [

])

router.delete('/:id', validateProjectId, (req, res, next) => {

})

router.get('/:id/actions', validateProjectId, (req, res, next) => {

})

module.exports = router