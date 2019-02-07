const express = require ('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');


const app = express();


mongoose.connect('mongodb://ub:ub1234@ds125225.mlab.com:25225/coinly', { useNewUrlParser: true })
                .then(()=>{
                    console.log('Connected to Database');
                })
                .catch(e =>{
                    console.log('error',e);
                });


app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));


app.listen(4000, ()=>{
    console.log(`Server started`);
});

