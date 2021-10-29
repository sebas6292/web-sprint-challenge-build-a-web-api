const express = require('express')
const { handleError, validateProjectId } = require('./projects-middleware')

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

// router.post('/', (req, res, next) => { 
//     Projects.insert({ project_id: req.project_id })
//     .then(newproject => { 
//       res.status(201).json(newproject)
//     })
//     .catch(next)
// })

// router.post('/', (req, res, next) => { 
//     const { project_id } = req.body
//     if (!project_id) { 
//         res.status(400).json({ 
//         message: 'Please provide the requirements for the project',
//         })
//     } else { 
//         Projects.insert({ project_id })
//         .then(({ id }) => {
//             return Projects.insert(id)
//         })
//         .then(project => {
//         res.status(201).json(project)
//         })
//         .catch(next)
//     }
// })

// router.put('/:id', validateProjectId, (req, res, next) => { 
//     Projects.update(req.params.id, { project_id: req.project_id})
//     if (!project_id) {
//         res.status(400).json({ 
//             message: 'Please provide the requirements for the project',
//             })
//     } 
//     .then(updateproject => {
//          res.json(updateproject)
//     })
//     .catch(next)
// })

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

