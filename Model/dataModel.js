const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    links :[{
        self : [{
            href : String
        }]
    }],
    identifier : String,
    familly : String,
    parent : String,
    groups : [String],
    categories : [String],
    enabled : Boolean,
    values : { type : Array , "default" : []},
    created : Date,
    updated : Date,
    associations : { type : Array , "default" : []}
});

module.exports = mongoose.model('Accessories',dataSchema);