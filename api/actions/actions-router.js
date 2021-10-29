// Write your "actions" router here!
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

router.post('/', (req, res, next) => { 
    const { project_id } = req.body
    if (!project_id) { 
        res.status(400).json({ 
        message: 'Please provide the requirements for the project',
        })
    } else { 
        Actions.insert({ project_id })
        .then(({ id }) => {
            return Actions.insert(id)
        })
        .then(action => {
        res.status(201).json(action)
        })
        .catch(next)
    }
})

router.put('/:id', validateActionId, (req, res, next) => { 
    
})

router.delete('/:id', validateActionId, (req, res, next) => { 
    
})

router.use(handleError);

module.exports = router;
