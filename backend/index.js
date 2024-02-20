const express= require('express')
const app = express()
const mongodb = require('./db')
mongodb()

app.use((req,res,next)=>
{
    res.setHeader('Access-control-Allow-Origin',"http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept"
    );
    next()
})

app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))




app.listen(5000,()=>
{
    console.log("app running in the port")
})