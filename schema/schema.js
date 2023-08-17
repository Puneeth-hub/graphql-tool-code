const graphql = require('graphql')  
const _ = require('loadsh')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;  

const users = [
    {id: '23', firstName: 'puneet', age:20},
    {id: '47', firstName: 'Rashid', age:58}
];

const UserType = new GraphQLObjectType({
    name: 'User', 
    fields:{
        id: { type: GraphQLString},
        firstName: { type: GraphQLString},
        age: {type: GraphQLInt}
    }
});  

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type: UserType,
            args:{id:{type: GraphQLString} }, 
            resolve(parentValue, args){
                return _.find(users, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})