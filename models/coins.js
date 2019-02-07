const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coinSchema = new Schema({
    project_name:String,
    project_ticker:Number
});

module.exports = mongoose.model('Coin',coinSchema)