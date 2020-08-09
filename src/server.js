const { response } = require('express')

const express = require('express')
const server = express()

server.use(express.static("public"))

.get("/", (require, response) => {
    return response.sendFile(__dirname + "/views/index.html")
})
.get("/study", (require, response) => {
    return response.sendFile(__dirname + "/views/study.html")
})
.get("/give-classes", (require, response) => {
    return response.sendFile(__dirname + "/views/give-classes.html")
})
.listen(5500)