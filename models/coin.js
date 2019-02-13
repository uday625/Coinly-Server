const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coinSchema = new Schema({
    name:String,
    tickerSymbol:String,
    tickerImage: String,
    icoUSDPrice:String,
    icoETHPrice:String,
    icoBTCPrice:String,
    icoTotalUSDRaised:String,
    icoDate:String
});

module.exports = mongoose.model('Coin',coinSchema)