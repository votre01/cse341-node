const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main() {
    const client = new MongoClient(process.env.URI);

    try {
        await client.connect();
        const movieTitle = 'The Italian';
        await findMovieByName(client, movieTitle);
    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

// List all databases
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');

    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}

 // Adds single movie to movies collection
async function addMovie(client, movie) {
    const result = await client.db('sample_mflix').collection('movies').insertOne(movie);
    console.log(`New movie added with id: ${result.insertedId}`);
}

// Adds multiple movies to movies collection
async function addMultipleMovies (client, movies) {
    const result = await client.db('sample_mflix').collection('movies').insertMany(movies);
    console.log(`Inserted ${result.insertedCount} movies with ids:`);
    console.log(result.insertedIds);    
}

// Find single movie by title
async function findMovieByName(client, movieTitle) {
    const result = await client.db('sample_mflix').collection('movies').findOne({title: movieTitle});
    if (result) {
        console.log(result);
    } else {
        console.log(`No results found for movie with title: ${movieTitle}`);
    }
}