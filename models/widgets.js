var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../lib/db');

var widgetsSchema = new Schema({
    id: Number,
    name: String,
    information: String,
    planning: String,
    design: String,
    development: String,
    testing: String,
    launch: String,
});

widgetsSchema.plugin(db.autoIncrement.plugin, { model: 'Widgets', field: 'id', startAt: 1 });
module.exports = mongoose.model('Widgets', widgetsSchema);