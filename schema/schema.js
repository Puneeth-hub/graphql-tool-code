const { default: axios } = require('axios');
const graphql = require('graphql')  
const _ = require('loadsh')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql;  

const CompanyType = new GraphQLObjectType({
    name: 'Company', 
    fields: () =>({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description:{type: GraphQLString},
        users: {
          type: new GraphQLList(UserType),
          resolve(parentValue, args){
            return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
               .then(resp => resp.data)
          }
        }
    })
})


//User queries

const UserType = new GraphQLObjectType({
     name: 'User', 
    fields:{
        id: { type: GraphQLString},
        firstName: { type: GraphQLString},
        age: {type: GraphQLInt},
        city: {type: GraphQLString},
        company:{
             type: CompanyType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                   .then(resp => resp.data)
            }
        }
    }
});  

//multiple root queries
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type: UserType, //user details get
            args:{id:{type: GraphQLString} }, 
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/users/${args.id}`) 
                   .then(resp => resp.data)
            }
        },
        company:{
            type: CompanyType,
            args: {id: {type: GraphQLString} }, 
            resolve(parentValue,args){
                return axios.get(`http://localhost:3000/companies/${args.id}`) 
                    .then((resp) => resp.data)
            }
        },




        users: {
            type: new GraphQLList(UserType), // Use GraphQLList  means total data get
            resolve(parentValue, args) {
                return  axios
                .get('http://localhost:3000/users')
                .then((resp) => resp.data);
            }
        },
    }
})
 
module.exports = new GraphQLSchema({
    query: RootQuery
})