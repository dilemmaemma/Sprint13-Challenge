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

module.exports = {
    validateProjectId,
    
}