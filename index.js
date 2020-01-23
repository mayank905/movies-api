const db = require('./service')
const table = require('./CreateTable')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////
//table.createTable()
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/api/directors', db.getDirectors)
app.get('/api/directors/:directorId', db.getDirectorById)
app.post('/api/directors', db.createDirector)
app.put('/api/directors/:directorId', db.updateDirectorById)
app.delete('/api/directors/:directorId', db.deleteDirectorById)

app.get('/api/movies',db.getMovies)
app.post('/api/movies',db.createMovies)
app.get('/api/movies/:movieId',db.getMoviesById)
app.put('/api/movies/:movieId',db.updateMoviesById)
app.delete('/api/movies/:movieId',db.deleteMoviesById)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
