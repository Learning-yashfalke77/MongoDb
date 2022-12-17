// npm init -y : to skip all steps of package.json
// --------------------- install mongoose: npm i mongoose-----------------------------
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/movieApp')
    .then((result) => {
        console.log('Connection Open')
    }).catch((err) => {
        console.log('Oh no some error')
        console.log(err)
    });

// Defining Schemaaa
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String,
});

// Now Creating Model: Model name must be plural and 1st letter Capital
const Movie = mongoose.model('Movie', movieSchema)

// Save to Database
// ---------------------- Create ---------------------------------------------------
const amadeus = new Movie({title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'});
amadeus.save()

// // ----- Insert Many: Returns Promise
Movie.insertMany([
    {title: 'Amelie', year: 2001, score: 8.3, rating: 'R'},
    {title: 'Alien', year: 1979, score: 8.1, rating: 'R'},
    {title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG'},
    {title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R'},
    {title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13'},
]).then((result) => {
    console.log('It Worked')
    console.log(result);
}).catch((err) => {
    console.log(err);
});

// -------------------------------------------------------- Find ------------------------------------------------------
Movie.find({})   //To find all, moongose returns 'Query Sets' not object but if weuse promise it returns data in arrays of object
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err);
    });  

Movie.find({rating: 'PG-13'})   
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err);
    });

Movie.find({year: {$gte: 2010}})  //movie-year: >= 2010
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err);
    });  

Movie.find({year: {$lt: 1990}})  //movie-year: < 2010
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err);
    });  

Movie.findOne({year: {$lt: 1990}})  //returns one object
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err);
    });  

Movie.findById('6135a32323f2970e85c819f3')  //returns one object
    .then((result) => {
        console.log(result)
    }).catch((err) => {
        console.log(err);
    });  

// ---------------------------------------------------------- Update one ----------------------------------------------------------
Movie.updateMany({title: "Amadeus"}, {year: 1984})   //We can use update one also
    .then((result) => {
        console.log(result)       //Wil not return updated databut return updated info about data
    }).catch((err) => {
        console.log(err);
    });

Movie.updateMany({ title: { $in: ['Amadeus', 'Stand By Me'] } }, { score: 10 })
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });

// Find one and update: It will return the old data
// To get updated new data add third argument as new: true
Movie.findOneAndUpdate({ title: "The Iron Giant" }, { score: 7 }, {new: true})
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });

// Find by id and delete also returns data


// ------------------------------------------------------------ Remove /delete -----------------------------
Movie.remove({ title: 'Amelie' })
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });

Movie.deleteMany({year: {$gte: 1999}})
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });

Movie.findOneAndDelete({title: 'Alien'})    //It will return data
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });

