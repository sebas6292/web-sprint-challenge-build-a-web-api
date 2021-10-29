const express = require('express')
const { handleError, validateActionId } = require('./actions-middlware')

const Actions = require('./actions-model')
const router = express.Router(); 

router.get('/', (req, res, next) => { 
    Actions.get()
    .then(action => {
        res.json(action)
    })
    .catch(next)
})

router.get('/:id', validateActionId, (req, res) => { 
    res.json(req.action)
})

// router.post('/', (req, res, next) => { 
//     Actions.insert({ project_id: req.project_id })
//     .then(newAction => { 
//       res.status(201).json(newAction)
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
//         Actions.insert({ project_id })
//         .then(({ id }) => {
//             return Actions.insert(id)
//         })
//         .then(action => {
//         res.status(201).json(action)
//         })
//         .catch(next)
//     }
// })

// router.put('/:id', validateActionId, (req, res, next) => { 
//     Actions.update(req.params.id, { project_id: req.project_id})
//     if (!project_id) {
//         res.status(400).json({ 
//             message: 'Please provide the requirements for the project',
//             })
//     } 
//     .then(updateAction => {
//          res.json(updateAction)
//     })
//     .catch(next)
// })

router.delete('/:id', validateActionId, async (req, res, next) => { 
    try { 
        await Actions.remove(req.params.id)
        res.json(req.action)
    } catch(err) { 
        next(err)
    }
})

router.use(handleError);

module.exports = router;
