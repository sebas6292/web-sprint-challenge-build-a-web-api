require('dotenv').config()

const express = require('express')

const server = express() 

const PORT = process.env.PORT || undefined

server.listen(PORT, () => { 
    console.log(`listening on ${PORT}`)
})



