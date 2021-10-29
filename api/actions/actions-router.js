const express = require('express')
const { 
    handleError, 
    validateActionId, 
    validateActions 
} = require('./actions-middlware')

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

router.post('/', validateActions, (req, res, next) => { 
    Actions.insert(req.body)
    .then(newAction => { 
      res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateActions, (req, res, next) => { 
    Actions.update(req.params.id, req.body)
   .then(action => {
       res.status(200).json(action)
   })
    .catch(next)
})

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
