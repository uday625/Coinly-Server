const express = require ('express');

const app = express();

app.listen(process.env.PORT  || 4000, process.env.IP, ()=>{
    console.log("Server started");
})

