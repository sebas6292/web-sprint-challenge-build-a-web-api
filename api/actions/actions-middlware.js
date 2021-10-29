const Action = require('./actions-model')
const yup = require('yup')

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

const actionSchema = yup.object().shape({
    project_id: yup
    .string()
    .typeError('needs to be a string')
    .required('NEED an ID')
    .max(128, 'cannot be longer than 128')
})

async function validateActions(req, res, next) {
    try {
        const validated = await actionSchema.validate(
            req.body,
            {strict: false, stripUnknown: true}
        )
        req.body = validated
        next()
    } catch (err) {
        next({ status: 400, message: err.message})
    }
}


module.exports = {
    handleError,
    validateActionId,
    validateActions
}
