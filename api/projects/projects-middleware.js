const Project = require('./projects-model')

function handleError(err, req, res, next) { //eslint-disable-line
        res.status(err.status || 500).json({
        message: err.message, 
        stack: err.stack,
        prodMessage: 'Something went terribly wrong!',
    })
}

async function validateProjectId (req, res, next) { 
    try { 
        const project = await Project.get(req.params.id)
        if (!project) { 
            res.status(404).json({
            message: 'Project ID is not found!',
            })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
        message: 'Problem finding the projects ID!',
        })
    }
}

module.exports = {
    handleError,
    validateProjectId
}

