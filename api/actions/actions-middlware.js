// add middlewares here related to actions
const Action = require('./actions-model')
// const yup = require('yup');

function handleError(err, req, res, next) { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message, 
        prodMessage: 'something went terribly wrong!',
    })
}



module.exports = {
    handleError,
}
