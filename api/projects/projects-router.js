const express = require('express')
const { 
    handleError, 
    validateProjectId, 
    validateProjects 
} = require('./projects-middleware')

const Projects = require('./projects-model')
const router = express.Router(); 

router.get('/', (req, res, next) => { 
    Projects.get()
    .then(project => {
        res.json(project)
    })
    .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => { 
    res.json(req.project)
})

router.post('/', validateProjects, (req, res, next) => { 
    Projects.insert(req.body)
    .then(newProject=> { 
      res.status(201).json(newProject)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, validateProjects, (req, res, next) => { 
    Projects.update(req.params.id, req.body)
   .then(project => {
       res.status(200).json(project)
   })
    .catch(next)
})

router.delete('/:id', validateProjectId, async (req, res, next) => { 
    try { 
        await Projects.remove(req.params.id)
        res.json(req.project)
    } catch(err) { 
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const result = await Projects.getProjectActions(req.params.id)
        res.json(result)
    } catch (err) {
        next(err)
    }
})

router.use(handleError);

module.exports = router;

