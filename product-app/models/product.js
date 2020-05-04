const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
   name: {type: String},
   location: {type: String},
   expiry: {type: String},
   amount: {type: Number},
   days: {type: Number}
}, {
    collection: 'Products'
});

module.exports = mongoose.model('Product', ProductSchema);