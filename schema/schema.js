const graphql = require('graphql');
const Coin = require('../models/coin');
const _ = require('lodash');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
} = graphql;


const CoinType = new GraphQLObjectType({
    name:'Coin',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        tickerSymbol:{type:GraphQLString},
        tickerImage:{type:GraphQLString},
        icoUSDPrice:{type:GraphQLString},
        icoETHPrice:{type:GraphQLString},
        icoBTCPrice:{type:GraphQLString},
        icoTotalUSDRaised:{type:GraphQLString},
        icoDate:{type:GraphQLString}
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


const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addCoin:{
            type:CoinType,
            args:{
                name:{type:GraphQLString},
                tickerSymbol:{type:GraphQLString},
                tickerImage:{type:GraphQLString},
                icoUSDPrice:{type:GraphQLString},
                icoETHPrice:{type:GraphQLString},
                icoBTCPrice:{type:GraphQLString},
                icoTotalUSDRaised:{type:GraphQLString},
                icoDate:{type:GraphQLString}                
            },
            resolve(parent,args){
                let coin = new Coin({
                    name: args.name,
                    tickerSymbol:args.tickerSymbol,
                    tickerImage:args.tickerImage,
                    icoUSDPrice:args.icoUSDPrice,
                    icoETHPrice:args.icoETHPrice,
                    icoBTCPrice:args.icoBTCPrice,
                    icoTotalUSDRaised:args.icoTotalUSDRaised,
                    icoDate:args.icoDate
                });
                return coin.save();
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})