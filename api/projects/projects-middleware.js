const Project = require('./projects-model')

async function validateProjectId (req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
          next({status: 404, message: 'project not found'})
        } else {
          req.project = project
          next()
        }
      } catch (err) {
        res.status(404).json({
          message: 'problem finding project'
        })
      }
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    if (!name && !description) {
        res.status(400).json({
            message: 'missing required name and description field'
        })
    } else if (!name || !name.trim()) {
      res.status(400).json({
        message: 'missing required name field'
      })
    } else if (!description) {
        res.status(400).json({
            message: 'missing required description field'
        })
    } else {
        req.name = name.trim()
        req.description = description
        req.completed = completed
        next()
    }
}

module.exports = {
    validateProjectId,
    validateProject,

}