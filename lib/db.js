var config = require('../config');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');


mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

var db = mongoose.connection;

autoIncrement.initialize(mongoose.connection);

db.on('error', console.error.bind(console, 'connection error:'));

exports.connection = db;
exports.autoIncrement = autoIncrement;