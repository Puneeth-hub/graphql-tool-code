# graphql-tool-code
This code is regarding graphql tool code..!  


Server code ...! in the git server folder not open ...!

const express  = require('express'); 
const  { graphqlHTTP }= require('express-graphql')
const schema = require('../schema/schema')

const app = express(); 

app.use('/graphql',  graphqlHTTP({
    schema,
    graphiql: true

}))



app.listen(4000, ()=>{
    console.log('Server is runing')
    
})
