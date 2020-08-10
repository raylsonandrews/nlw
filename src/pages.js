const Database = require ('./database/db')

const {subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')

function pageLanding(require, response) {
    return response.render("index.html")
}

async function pageStudy(require, response) {
    const filters = require.query;

    if (!filters.subject || !filters.weekday || !filters.time){
        return response.render("study.html", {filters, subjects, weekdays})
    }

    const timeToMinutes = convertHoursToMinutes(filters.time)

     const query = `
        SELECT classes.*,proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            Where class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
     `

     try {
              const db = await Database
              const proffys = await db.all(query)

              proffys.map((proffy) => {
                  proffy.subject = getSubject(proffy.subject)
              })

              return response.render('study.html', { proffys, subjects, filters, weekdays })
     } catch (error) {
         console.log(error)
     }
    
}

function pageGiveClasses(require, response) {
    return response.render("give-classes.html", {subjects, weekdays})
}

async function saveClasses(require, response) {
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: require.body.name,
        avatar: require.body.avatar,
        whatsapp: require.body.whatsapp,
        bio: require.body.bio
    }

    const classValue = {
        subject: require.body.subject,
        cost: require.body.cost
    }

    const classScheduleValues = require.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes (require.body.time_from[index]),
            time_to: convertHoursToMinutes (require.body.time_to[index])
        }
    })

    try {

    const db = await Database
    await createProffy(db, {proffyValue, classValue, classScheduleValues})

    let queryString ="?subject=" + require.body.subject
    queryString += "&weekday=" + require.body.weekday[0]
    queryString += "&time=" + require.body.time_from[0]

    return response.redirect("/study"+ queryString)

    } catch (error) {
        console.log(error)
    } 
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}