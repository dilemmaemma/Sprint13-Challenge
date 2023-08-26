const express = require('express')
const {
    validateProjectId,
} = require('./projects-middleware')

const Project = require('./projects-model')
const router = express.Router()

router.get('/projects', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/projects/:id', validateProjectId, (req, res, next) => {
    req.json(req.project)
})

router.post('/projects', (req, res, next) => {

})

router.put('/projects/:id', validateProjectId, (req, res, next) => [

])

router.delete('/projects/:id', validateProjectId, (req, res, next) => {

})

router.get('/projects/:id/actions', validateProjectId, (req, res, next) => {

})