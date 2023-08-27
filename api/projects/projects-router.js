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

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert({name: req.name, description: req.description, completed: req.completed})
    .then(newProject => {
      res.status(201).json(newProject)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, {name: req.name, description: req.description, completed: req.completed})
        .then(() => {
            return Project.get(req.params.id);
        })
        .then(updatedProject => {
            res.json(updatedProject);
        })
        .catch(next);
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.json(req.project)
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const result = await Project.getProjectActions(req.params.id)
        res.json(result)
      } catch(err) {
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