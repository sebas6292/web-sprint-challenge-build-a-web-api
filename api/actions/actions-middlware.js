const Action = require('./actions-model')

function handleError(err, req, res, next) { //eslint-disable-line
        res.status(err.status || 500).json({
        message: err.message, 
        stack: err.stack,
        prodMessage: 'Something went terribly wrong!',
    })
}

async function validateActionId (req, res, next) { 
    try { 
        const action = await Action.get(req.params.id)
        if (!action) { 
            res.status(404).json({
            message: 'Action ID is not found!',
            })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
        message: 'Problem finding the actions ID!',
        })
    }
}

module.exports = {
    handleError,
    validateActionId
}
