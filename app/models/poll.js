var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var pollSchema = new Schema({
    username     : String,
    question     : String,
    options      : [String],
    votes        : [Number]
});

module.exports = mongoose.model('Poll', pollSchema);