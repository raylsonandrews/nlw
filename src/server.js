const proffys = [
    { 
    name: "Diego Fernandes", 
    avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
    whatsapp: "85996652387", 
    bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    subject: "Química", 
    cost:"20", 
    weekday: [0], 
    time_from: [720], 
    time_to: [1220] 
    },
    { 
    name: "Daniela Evangelista", 
    avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
    whatsapp: "85996652387", 
    bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    subject: "Química", 
    cost:"20", 
    weekday: [1], 
    time_from: [720], 
    time_to: [1220]
    },
    { 
        name: "Mayk Brito", 
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4", 
        whatsapp: "85996652387", 
        bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Química", 
        cost:"20", 
        weekday: [1], 
        time_from: [720], 
        time_to: [1220]
    }

];

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sabado",
]

function getSubject(subjectNumber) {
    const arrayPosition = +subjectNumber -1
    return subjects[arrayPosition]
}

function pageLanding(require, response) {
    return response.render("index.html")
}

function pageStudy(require, response) {
    const filters = require.query;
    return response.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(require, response) {
    const data = require.query;
    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)

        proffys.push(data)

        return response.redirect("/study")
    }
    return response.render("give-classes.html", {subjects, weekdays})
}


const { response } = require('express');

const express = require('express');
const server = express();
const nunjucks = require('nunjucks');

nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server.use(express.static("public"))

.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)

.listen(5500);