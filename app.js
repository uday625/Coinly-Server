const express = require ('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');


const app = express();

let mongoUserCredentials = '';
if (process.env.MONGO_USER && process.env.MONGO_PASSWORD) {
mongoUserCredentials = `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`;
}

const MONGO_URL = process.env.MONGO_URL || 'localhost:27017';
const DB_NAME = process.env.DB_NAME || 'sample-db';
const MONGO_CONNECTION_STRING = `mongodb://${mongoUserCredentials}${MONGO_URL}/${DB_NAME}`;

mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true })
                .then(()=>{
                    console.log('Connected to Database');
                })
                .catch(err =>{
                    console.log(`Error connecting to Database - ${err.message}`);
                });


app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));


app.listen(process.env.PORT || 4000, ()=>{
    console.log(`Server started on port: ${process.env.PORT || 4000}`);
});

