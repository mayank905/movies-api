const Pool = require('pg').Pool
const pool = new Pool({
    user: 'mayank',
    host: 'localhost',
    database: 'api',
    password: 'mayank',
    port: 5432,
})

const getDirectors = (request, response) => {
    console.log('get director Request runned')
    pool.query('SELECT * FROM public.directors', (error, results) => {
        if (error) {
            response.status(500).send(JSON.stringify({"error":error}))
        }
        else{
        response.status(200).json(results.rows)}
    })
}

const getDirectorById = (request, response) => {
    console.log('get particular director by id')
    console.log(request.params)
    const id = parseInt(request.params.directorId)

    pool.query('SELECT name FROM directors WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(500).send(JSON.stringify({"error":error}))
        }
        else if(results.rows.length==0){

            response.status(404).send(JSON.stringify({"status": 404, "error": null, "response": 'No record found'}));
        }
    else {

            response.status(200).json(results.rows)
        }
    })
}


const createDirector = (request, response) => {
    let variable=request.body.key
    for(let column in request.body){variable=column}
    console.log(variable)
    if(variable  =="name") {
        const {name} = request.body;
        console.log(request.body);


    pool.query('INSERT INTO directors(name) VALUES ($1)', [name], (error, results) => {
        if (error) {
            response.status(500).send(JSON.stringify({"error":error}))
        }
        else {

        response.status(201).send(JSON.stringify({"status": 201, "error": null, "response": results.rowCount+" row inserted"}));
        }
    })}
    else{
        response.status(422).send(JSON.stringify({"status": 422, "error": null, "response": "invalid data"}));
    }
}

const updateDirectorById = (request, response) => {
    const id = parseInt(request.params.directorId)
    let variable=Object.keys(request.body)[0]
    if(variable  =="name") {
    const { name } = request.body

    pool.query(
        'UPDATE directors SET name = $1 WHERE id = $2',
        [name,id],
        (error, results) => {
            if (error) {
                response.status(500).send(JSON.stringify({"error":error}))
            }
            else if(results.rowCount==1){
                response.status(200).send(JSON.stringify({"status": 200, "error": null, "response": `User modified with ID: ${id}`}));
            }
            else{
                response.status(404).send(JSON.stringify({"status": 404, "error": null, "response": "No Record Found"}));
            }
        }
    )}
    else{response.status(422).send(JSON.stringify({"status": 422, "error": null, "response": "invalid data"}));}
}

const deleteDirectorById = (request, response) => {
    const id = parseInt(request.params.directorId)

    pool.query('DELETE FROM directors WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(500).send(JSON.stringify({"error":error}))
        }
        else if(results.rowCount==1){
        response.status(200).send(JSON.stringify({"status": 200, "error": null, "response": "director on id "+id+" deleted"}));
        }
        else{
            response.status(404).send(JSON.stringify({"status": 404, "error": null, "response": "No Record Found"}));
        }
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getMovies = (request, response) => {
    console.log('get movies Request runned')
    pool.query('SELECT * FROM public.movies', (error, results) => {
        if (error) {
            response.status(500).send(JSON.stringify({"error":error}))
        }
        else{
            response.status(200).json(results.rows)}
    })
}

const getMoviesById = (request, response) => {
    console.log('get particular movie by id')
    //console.log(request.params)
    const id = parseInt(request.params.movieId)

    pool.query('SELECT * FROM movies WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(500).send(JSON.stringify({"error":error}))
        }
        else if(results.rows.length==0){

            response.status(404).send(JSON.stringify({"status": 404, "error": null, "response": 'No record found'}));
        }
        else {

            response.status(200).json(results.rows)
        }
    })
}


const createMovies = (request, response) => {

    const { title,description,runtime,genre,rating,metascore,votes,gross_earning_in_mil,director_id,actor,year } = request.body
    console.log(request.body)

    pool.query('INSERT INTO movies(title,description,runtime,genre,rating,metascore,votes,gross_earning_in_mil,director_id,actor,year) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [title,description,runtime,genre,rating,metascore,votes,gross_earning_in_mil,director_id,actor,year], (error, results) => {
        if (error) {
            response.status(500).send(JSON.stringify({"error":error}))
        }
        else {

            response.status(201).send(JSON.stringify({"status": 201, "error": null, "response": results.rowCount+" row inserted"}));
        }
    })
}


const updateMoviesById = (request, response) => {
    const id = parseInt(request.params.movieId)
    let values=[]
    url='UPDATE movies SET '

    let counter=0
    for( let column in request.body){
        counter++
        url=url+column+'='+'$'+counter+','
        values.push(request.body[column])
    }

    url=url.slice(0,url.length-1)
    url=url+'WHERE id = '+id+';'
    console.log(url)
    pool.query(
        url,values,
        (error, results) => {
            if (error) {
                response.status(500).send(JSON.stringify({"error":error}))
            }
            else if(results.rowCount==1){
                response.status(200).send(JSON.stringify({"status": 200, "error": null, "response": `Movie modified with ID: ${id}`}));
            }
            else{
                response.status(404).send(JSON.stringify({"status": 404, "error": null, "response": "No Record Found"}));
            }
        }
    )
}

const deleteMoviesById = (request, response) => {
    const id = parseInt(request.params.movieId)

    pool.query('DELETE FROM movies WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(500).send(JSON.stringify({"error":error}))
        }
        else if(results.rowCount==1){
            response.status(200).send(JSON.stringify({"status": 200, "error": null, "response": "movies on id "+id+" deleted"}));
        }
        else{
            response.status(404).send(JSON.stringify({"status": 404, "error": null, "response": "No Record Found"}));
        }
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    getDirectors,
    getDirectorById,
    createDirector,
    updateDirectorById,
    deleteDirectorById,

    getMovies,
    getMoviesById,
    createMovies,
    updateMoviesById,
    deleteMoviesById,
}
