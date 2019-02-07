const graphql = require('graphql');
const Coin = require('../models/coins');


const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
} = graphql;


const CoinType = new GraphQLObjectType({
    name:'Coins',
    fields:()=>({
        id:{type:GraphQLID},
        project_name:{type:GraphQLString},
        project_ticker:{type:GraphQLString}
    })
});


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        coin:{
            type:CoinType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Coin.findById(args.id);
            }
        },

        coins:{
            type:new GraphQLList(CoinType),
            resolve(parent,args){
                return Coin.find({});
            }
        }
        
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})